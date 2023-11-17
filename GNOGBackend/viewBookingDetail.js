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
          GROUP_CONCAT(br.room_id) AS room_ids,
          GROUP_CONCAT(rt.room_type_name) AS room_type_names
        FROM booking b
        JOIN guest g ON b.guest_id = g.guest_id
        LEFT JOIN booking_room br ON b.booking_id = br.booking_id
        LEFT JOIN room r ON br.room_id = r.room_id
        LEFT JOIN room_type rt ON r.room_type_id = rt.room_type_id
        WHERE b.booking_id = ?
        GROUP BY b.booking_id, b.checkin_date, b.checkout_date, b.booking_status, b.booking_note,
          g.guest_title, g.guest_first_name, g.guest_middle_name, g.guest_last_name,
          g.guest_telnum, g.guest_email, g.guest_address;
      `, [booking_id]);
  
      connection.release();
  
      if (results.length === 0) {
        return { success: false, message: 'Booking not found.' };
      }
  
      const bookingDetails = results[0];
      bookingDetails.room_ids = bookingDetails.room_ids.split(',').map(Number); // Convert to array of numbers
      bookingDetails.room_type_names = bookingDetails.room_type_names.split(','); // Convert to array of strings
  
      return { success: true, bookingDetails };
    } catch (error) {
      console.error('Error fetching booking details:', error);
      throw error;
    }
  }
  
  module.exports = {
    viewBookingDetail: viewBookingDetail,
  };
