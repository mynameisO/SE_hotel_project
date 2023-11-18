const mysql = require('mysql2/promise');
require('dotenv').config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

// Create a connection pool
const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function updateBookingStatus({ booking_id, status }) {
  try {
    const connection = await pool.getConnection();

    // Get the current booking status and additional details
    const [currentStatusResults, detailsResults] = await Promise.all([
      connection.execute(
        // Use aliases to avoid potential naming conflicts
        'SELECT b.booking_status, br.room_id FROM booking b LEFT JOIN booking_room br ON b.booking_id = br.booking_id WHERE b.booking_id = ?',
        [booking_id]
      ),
      connection.execute(`
        SELECT
          CONCAT(guest.guest_first_name, ' ', guest.guest_last_name) AS guest_name,
          guest.guest_telnum AS guest_tel,
          GROUP_CONCAT(DISTINCT CONCAT('Room ID: ', room.room_id, ' - Room Type: ', room_type.room_type_name) SEPARATOR ', ') AS booking_detail
        FROM booking b
        JOIN guest ON b.guest_id = guest.guest_id
        LEFT JOIN booking_room br ON b.booking_id = br.booking_id
        LEFT JOIN room ON br.room_id = room.room_id
        LEFT JOIN room_type ON room.room_type_id = room_type.room_type_id
        WHERE b.booking_id = ?
        GROUP BY b.booking_id, guest.guest_first_name, guest.guest_last_name, guest.guest_telnum
      `, [booking_id]),
    ]);

    console.log('currentStatusResults:', currentStatusResults);

    // Check if the received status is the same as the current status
    if (currentStatusResults.length === 0 || currentStatusResults[0].length === 0) {
      connection.release(); // Release the connection back to the pool
      return { success: false, message: 'Booking not found.' };
    }

    // Extract current status and room_id
    const currentStatus = currentStatusResults[0][0].booking_status;
    const room_id = currentStatusResults[0][0].room_id;

    if (currentStatus === status) {
      connection.release(); // Release the connection back to the pool
      console.log('Booking status is already ' + status);
      return {
        success: false,
        message: 'Booking status is already ' + status,
        booking_id,
        currentStatus,
        guest_name: detailsResults[0][0].guest_name,
        guest_tel: detailsResults[0][0].guest_tel,
        booking_detail: detailsResults[0][0].booking_detail,
      };
    }

    const currentStatusRows = currentStatusResults[0];

    if (currentStatusRows.length === 0) {
      connection.release(); // Release the connection back to the pool
      return { success: false, message: 'Booking not found.' };
    }
    
    // Array to store room_ids for room status update
    const roomIds = currentStatusRows.map(row => row.room_id);
    
    // Update the booking_status in the booking table
    const [results, fields] = await connection.execute(
      'UPDATE booking SET booking_status = ? WHERE booking_id = ?',
      [status, booking_id]
    );
    
    // Update the room_status to "free" for each room_id
    if (status === "cancel" || status === "checked_out") {
      // Update the room_status and log the result for each room_id
      for (const roomId of roomIds) {
        const [roomUpdateResults, roomUpdateFields] = await connection.execute(
          'UPDATE room SET room_status = "free" WHERE room_id = ?',
          [roomId]
        );
    
        console.log('Room status update result for room_id ' + roomId + ':', roomUpdateResults);
      }
    }

    console.log('detailsResults:', detailsResults);

    connection.release(); // Release the connection back to the pool

    if (detailsResults.length > 0 && detailsResults[0].length > 0) {
      return {
        success: true,
        message: 'Booking status updated successfully.',
        booking_id,
        updatedStatus: status,
        guest_name: detailsResults[0][0].guest_name,
        guest_tel: detailsResults[0][0].guest_tel,
        booking_detail: detailsResults[0][0].booking_detail,
      };
    } else {
      return { success: false, message: 'Booking not found.' };
    }
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
}

module.exports = {
  updateBookingStatus: updateBookingStatus,
};
