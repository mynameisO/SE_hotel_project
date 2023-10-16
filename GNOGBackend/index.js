const express = require('express');
const mysql = require('mysql');
const InsertBookingInfo = require('./insertBookingInfo'); // Import the InsertBookingInfo module

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host: 'omar-server.trueddns.com',
  port: 52300,
  user: 'gnog',
  password: '29136111',
  database: 'SEHP_proj'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('/api/room/room_room_available', (req, res) => {
  const query = `
    SELECT rt.room_type_id, rt.room_type_name, COUNT(r.room_id) AS 'Number of room', rt.price
    FROM room r
    RIGHT JOIN room_type rt ON r.room_type_id = rt.room_type_id
    WHERE r.room_status = 'free'
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


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});