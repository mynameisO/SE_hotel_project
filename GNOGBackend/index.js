const express = require('express');
const mysql = require('mysql2/promise');
const adminLogin = require('./adminLogin');
const InsertBookingInfo = require('./insertBookingInfo');
const adminAuth = require('./adminAuth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const exp_logger = require('express-requests-logger');
const cors = require('cors');
const searchBooking = require('./searchBooking');
const showBooking = require('./showBooking');
const { updateBookingStatus } = require('./updateBookingStatus');
const { viewAllBookings } = require('./viewAllBooking');
const { viewBookingDetail } = require('./viewBookingDetail');
const { updateRoomStatus } = require('./updateRoomStatus');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(exp_logger());
app.use(cors());

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

app.get('/api/room/room_available', async (req, res) => {

  const { checkin_date, checkout_date } = req.query;

  // Check if checkout_date is before checkin_date
  const checkinDateObj = new Date(checkin_date);
  const checkoutDateObj = new Date(checkout_date);


  if (checkoutDateObj < checkinDateObj) {
    console.error('Error: Checkout date is before check-in date');
    return res.status(400).json({ error: 'Checkout date cannot be before check-in date' });
  }

  try {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute(`
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
    `);
    connection.release(); // Release the connection back to the pool
    res.json(results);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/createBooking', async (req, res) => {
  const bookingData = req.body; // Get booking data from the request body

  try {
    const modifiedBookingData = InsertBookingInfo.transformBookingData(bookingData); // Transform bookingData
    const bookingId = await InsertBookingInfo.createBooking(modifiedBookingData); // Pass modified bookingData to the function
    res.status(200).json({ message: 'Booking created successfully', bookingId: bookingId });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: error.message });
  }
});



app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await adminLogin.login(email, password);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(401).json({ status: 'error', message: 'Login failed' });
  }
});

app.get('/api/admin/auth', adminAuth.authenticateAdmin, (req, res) => {
  const { staff_id, fname, lname, email } = req.user;
  res.status(200).json({
    status: 'ok',
    user: {
      staff_id: staff_id,
      fname: fname,
      lname: lname,
      email: email,
    },
  });
});

app.post('/api/admin/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing it

    const connection = await pool.getConnection();
    const [result] = await connection.execute('INSERT INTO Admin (email, password) VALUES (?, ?)', [email, hashedPassword]);

    connection.release(); // Release the connection

    // Create a JSON Web Token for the newly registered admin
    const token = jwt.sign({ email, staff_id: result.insertId }, process.env.secretKeyJWT, {
      expiresIn: '1h' // Token expiration time
    });

    res.status(201).json({ message: 'Admin registered successfully', token });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/admin/searchBooking', async (req, res) => {
  const { guest_name, guest_tel, status } = req.body;

  try {
    const results = await searchBooking.searchBooking({
      guest_name,
      guest_tel,
      status
    });

    res.json(results);
  } catch (error) {
    console.error('Error during searchBooking:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/api/admin/showBooking', async (req, res) => {
  try {
    const results = await showBooking.showBookings();
    res.json(results);
  } catch (error) {
    console.error('Error during showBookings:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/admin/updateBookingStatus', async (req, res) => {
  try {
    const { booking_id, status } = req.body;
    const result = await updateBookingStatus({ booking_id, status });

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/admin/viewAllBooking', async (req, res) => {
  try {
    const results = await viewAllBookings();
    res.json(results);
  } catch (error) {
    console.error('Error during viewAllBookings:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/admin/viewBookingDetail', async (req, res) => {
  try {
    const { booking_id } = req.body;
    const result = await viewBookingDetail(booking_id);

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/admin/updateRoomStatus', async (req, res) => {
  try {
    const { booking_id, room_id, status } = req.body;
    const result = await updateRoomStatus({ booking_id, room_id, status });

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }

  } catch (error) {
    console.error('Error in updateRoomStatus route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});