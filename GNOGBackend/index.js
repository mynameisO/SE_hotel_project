const express = require('express');
const mysql = require('mysql2/promise');
const adminLogin = require('./adminLogin');
const InsertBookingInfo = require('./insertBookingInfo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());


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
  const checkin_date = '2023-11-25';
  const checkout_date = '2023-11-27';

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
    // Get a connection from the pool
    const connection = await pool.getConnection();
    // Query the database
    const [results, fields] = await connection.execute('SELECT * FROM Admin WHERE email = ?', [email]);
    connection.release(); // Release the connection back to the pool

    // Handle the query results
    if (results.length === 0) {
      throw new Error('Invalid email or password');
    }

    const storedPassword = results[0].password;
    const isPasswordValid = await adminLogin.verifyPassword(password, storedPassword);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate and send the token
    const token = adminLogin.generateToken(results[0].email, results[0].staff_id);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(401).json({ error: error.message });
  }
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


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
