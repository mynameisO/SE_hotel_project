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

async function searchBooking({ guest_name, guest_tel, status }) {
  try {
    const connection = await pool.getConnection();
    const currentDate = new Date().toLocaleDateString('en-CA');

    // Build the WHERE clause based on the provided parameters
    let whereClause = '1'; // Default WHERE condition to avoid empty WHERE
    let queryParams = [];

    // Add conditions for guest_name and guest_tel
    if (guest_name) {
      whereClause += ' AND guest.guest_first_name LIKE ?';
      queryParams.push(`%${guest_name}%`);
    }

    if (guest_tel) {
      whereClause += ' AND guest.guest_telnum = ?';
      queryParams.push(guest_tel);
    }

    // Add a condition to filter by status if it is provided
    if (status === 'checked_in') {
      whereClause += ' AND (DATE(booking.checkin_date) = ? AND booking.booking_status = "checked in")';
      queryParams.push(currentDate);
    } else if (status === 'checked_out') {
      whereClause += ' AND (DATE(booking.checkout_date) >= ? AND booking.booking_status = "checked_in")';
      queryParams.push(currentDate);
    } else if (status === 'paid') {
      whereClause += ' AND booking.booking_status = "paid"';
    } else if (status === 'pending') {
      whereClause += ' AND booking.booking_status = "pending"';
    } else {
      whereClause += ` AND (
        (DATE(booking.checkout_date) >= ? AND booking.booking_status = "checked_in") OR 
        (DATE(booking.checkin_date) = ? AND booking.booking_status = "checked in") OR 
        booking.booking_status = "paid"
      )`;
      queryParams.push(currentDate);
      queryParams.push(currentDate);
    }

    console.log(`${whereClause}`, queryParams);

    // Execute the search query
    const [results, fields] = await connection.execute(`
      SELECT booking.booking_id, 
             CONCAT(guest.guest_first_name, ' ', guest.guest_last_name) AS guest_name, 
             guest.guest_telnum AS guest_telnum,
             GROUP_CONCAT(DISTINCT CONCAT('Room ID: ', room.room_id, ' - Room Type: ', room_type.room_type_name) SEPARATOR ', ') AS booking_detail, 
             booking.booking_status
      FROM booking
      JOIN guest ON booking.guest_id = guest.guest_id
      LEFT JOIN booking_room ON booking.booking_id = booking_room.booking_id
      LEFT JOIN room ON booking_room.room_id = room.room_id
      LEFT JOIN room_type ON room.room_type_id = room_type.room_type_id
      WHERE ${whereClause}
      GROUP BY booking.booking_id, guest.guest_first_name, guest.guest_last_name, guest.guest_telnum, booking.booking_status
    `, queryParams);

    connection.release(); // Release the connection back to the pool
    const formattedResults = results.map((result) => ({
      booking_id: result.booking_id,
      guest_name: result.guest_name,
      guest_telnum: result.guest_telnum,
      booking_detail: result.booking_detail,
      booking_status: result.booking_status,
    }));

    return formattedResults;
  } catch (error) {
    console.error('Error searching booking:', error);
    throw error;
  }
}

module.exports = {
  searchBooking: searchBooking,
};

