const express = require('express');
const mysql = require('mysql');
const InsertBookingInfo = require('./insertBookingInfo');
//const adminLogin = require('./adminLogin'); // Import the InsertBookingInfo module

const app = express();
app.use(express.json());

require('dotenv').config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('/api/room/room_available', (req, res) => {
  //const { checkin_date, checkout_date } = req.query; // Get check-in and check-out dates from request query parameters
  const checkin_date = '2023-11-25';
  const checkout_date = '2023-11-27';

  const query = `
    SELECT rt.room_type_id, rt.room_type_name, COUNT(r.room_id) AS 'Number of room', rt.price
    FROM room_type rt
    LEFT JOIN room r ON rt.room_type_id = r.room_type_id
    WHERE r.room_id NOT IN (
      SELECT br.room_id
      FROM booking b
      JOIN booking_room br ON b.booking_id = br.booking_id
      WHERE (
        (b.checkin_date BETWEEN '${checkin_date}' AND '${checkout_date}') OR
        (b.checkout_date BETWEEN '${checkin_date}' AND '${checkout_date}')
      )
    )
    GROUP BY rt.room_type_id, rt.room_type_name, rt.price
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});


app.post('/api/createBooking', (req, res) => {
  const bookingData = req.body; // Assuming booking data is sent in the request body

  // Call createBooking function from InsertBookingInfo module
  InsertBookingInfo.createBooking(bookingData, (error, bookingId) => {
    if (error) {
      // Handle error response
      return res.status(500).json({ error: error.message });
    }

    // Send success response with bookingId
    return res.status(200).json({ message: 'Booking created successfully', bookingId: bookingId });
  });
});

// Sample login endpoint
/*app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const connection = await createConnection();

  try {
    const token = await adminLogin.login(email, password, connection);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(401).json({ error: error.message });
  } finally {
    connection.end(); // Close the database connection after handling the request
  }
});*/

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});