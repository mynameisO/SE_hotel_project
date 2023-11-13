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

async function viewAllBookings() {
  try {
    const connection = await pool.getConnection();

    // Execute the query to get all bookings
    const [results, fields] = await connection.execute(`
      SELECT booking.booking_id, 
             CONCAT(guest.guest_first_name, ' ', guest.guest_last_name) AS guest_name, 
             guest.guest_telnum AS guest_tel,
             GROUP_CONCAT(DISTINCT CONCAT('Room ID: ', room.room_id, ' - Room Type: ', room_type.room_type_name) SEPARATOR ', ') AS booking_detail, 
             booking.booking_status
      FROM booking
      JOIN guest ON booking.guest_id = guest.guest_id
      LEFT JOIN booking_room ON booking.booking_id = booking_room.booking_id
      LEFT JOIN room ON booking_room.room_id = room.room_id
      LEFT JOIN room_type ON room.room_type_id = room_type.room_type_id
      GROUP BY booking.booking_id, guest.guest_first_name, guest.guest_last_name, guest.guest_telnum, booking.booking_status
    `);

    connection.release(); // Release the connection back to the pool

    const formattedResults = results.map((result) => ({
      booking_id: result.booking_id,
      guest_name: result.guest_name,
      guest_tel: result.guest_tel,
      booking_detail: result.booking_detail,
      booking_status: result.booking_status,
    }));

    return formattedResults;
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    throw error;
  }
}

module.exports = {
  viewAllBookings: viewAllBookings,
};