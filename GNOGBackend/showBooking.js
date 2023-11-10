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

async function showBookings() {
  try {
    const connection = await pool.getConnection();

    // Get the current date in the format 'YYYY-MM-DD'
    const currentDate = new Date().toLocaleDateString('en-CA');

    // Execute the query to get bookings for the current date
    const [results, fields] = await connection.execute(`
      SELECT booking.booking_id, 
             CONCAT(guest.guest_first_name, ' ', guest.guest_last_name) AS guest_name, 
             GROUP_CONCAT(DISTINCT CONCAT('Room ID: ', room.room_id, ' - Room Type: ', room_type.room_type_name) SEPARATOR ', ') AS booking_detail, 
             booking.booking_status
      FROM booking
      JOIN guest ON booking.guest_id = guest.guest_id
      LEFT JOIN booking_room ON booking.booking_id = booking_room.booking_id
      LEFT JOIN room ON booking_room.room_id = room.room_id
      LEFT JOIN room_type ON room.room_type_id = room_type.room_type_id
      WHERE DATE(booking.checkin_date) <= ? AND DATE(booking.checkout_date) >= ?
      GROUP BY booking.booking_id, guest.guest_first_name, guest.guest_last_name, booking.booking_status
    `, [currentDate, currentDate]);

    console.log('currentDate: ', currentDate);
    connection.release(); // Release the connection back to the pool

    const formattedResults = results.map((result) => ({
      booking_id: result.booking_id,
      guest_name: result.guest_name,
      booking_detail: result.booking_detail,
      booking_status: result.booking_status,
    }));

    return formattedResults;
  } catch (error) {
    console.error('Error showing bookings:', error);
    throw error;
  }
}

module.exports = {
  showBookings: showBookings,
};