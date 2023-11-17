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

async function viewBookingDetail(booking_id) {
  try {
    const connection = await pool.getConnection();

    const [results, fields] = await connection.execute(`
      SELECT
        b.booking_id,
        DATE_FORMAT(b.checkin_date, '%Y-%m-%d') AS checkin_date,
        DATE_FORMAT(b.checkout_date, '%Y-%m-%d') AS checkout_date,
        b.booking_status,
        b.booking_note,
        g.guest_title,
        g.guest_first_name,
        g.guest_middle_name,
        g.guest_last_name,
        g.guest_telnum,
        g.guest_email,
        g.guest_address,
        br.room_id AS room_id,
        rt.room_type_name AS room_type_name,
        r.room_status AS room_status
      FROM booking b
      JOIN guest g ON b.guest_id = g.guest_id
      LEFT JOIN booking_room br ON b.booking_id = br.booking_id
      LEFT JOIN room r ON br.room_id = r.room_id
      LEFT JOIN room_type rt ON r.room_type_id = rt.room_type_id
      WHERE b.booking_id = ?
    `, [booking_id]);

    connection.release();

    if (results.length === 0) {
      return { success: false, message: 'Booking not found.' };
    }

    const bookingDetails = {
      booking_id: results[0].booking_id,
      checkin_date: results[0].checkin_date,
      checkout_date: results[0].checkout_date,
      booking_status: results[0].booking_status,
      booking_note: results[0].booking_note,
      guest_title: results[0].guest_title,
      guest_first_name: results[0].guest_first_name,
      guest_middle_name: results[0].guest_middle_name,
      guest_last_name: results[0].guest_last_name,
      guest_telnum: results[0].guest_telnum,
      guest_email: results[0].guest_email,
      guest_address: results[0].guest_address,
      rooms: results.map((result) => ({
        room_id: result.room_id,
        room_type_name: result.room_type_name,
        room_status: result.room_status,
      })),
    };

    return { success: true, bookingDetails };
  } catch (error) {
    console.error('Error fetching booking details:', error);
    throw error;
  }
}

module.exports = {
  viewBookingDetail: viewBookingDetail,
};
