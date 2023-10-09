const express = require("express");

const app = express();

const mysql = require('mysql');


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
      SELECT rt.room_type_id, rt.room_type_name, COUNT(*) AS 'Number of room'
      FROM room AS r
      JOIN room_type AS rt ON r.room_type_id = rt.room_type_id
      WHERE r.room_status = 'free'
      GROUP BY rt.room_type_id, rt.room_type_name
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
  
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });