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

    // Update the booking_status in the booking table
    const [results, fields] = await connection.execute(
      'UPDATE booking SET booking_status = ? WHERE booking_id = ?',
      [status, booking_id]
    );

    connection.release(); // Release the connection back to the pool

    if (results.affectedRows === 1) {
      // Successfully updated
      return { success: true, message: 'Booking status updated successfully.' };
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