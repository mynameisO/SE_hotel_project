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

    // Get the current booking status
    const [currentStatusResults, _] = await connection.execute(
      'SELECT booking_status FROM booking WHERE booking_id = ?',
      [booking_id]
    );

    // Check if the received status is the same as the current status
    if (currentStatusResults.length === 0) {
      connection.release(); // Release the connection back to the pool
      return { success: false, message: 'Booking not found.' };
    }

    const currentStatus = currentStatusResults[0].booking_status;

    if (currentStatus === status) {
      connection.release(); // Release the connection back to the pool
      return { success: false, message: 'Booking status is already ' + status, booking_id, currentStatus };
    }

    // Update the booking_status in the booking table
    const [results, fields] = await connection.execute(
      'UPDATE booking SET booking_status = ? WHERE booking_id = ?',
      [status, booking_id]
    );

    connection.release(); // Release the connection back to the pool

    if (results.affectedRows === 1) {
      // Successfully updated
      return { success: true, message: 'Booking status updated successfully.', booking_id, updatedStatus: status };
    } else {
      // No rows affected, booking_id not found
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

// github workflow testing.