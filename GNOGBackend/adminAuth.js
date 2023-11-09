const jwt = require('jsonwebtoken');

const mysql = require('mysql2/promise');
require('dotenv').config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

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

function authenticateAdmin(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'forbidden', message: 'No Authorization Header' });
  }

  try {
    const decoded = jwt.verify(token, process.env.secretKeyJWT);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    console.log(token);
    return res.status(403).json({ status: 'forbidden', message: 'Access Token Invalid' });
  }
}

module.exports = {
  authenticateAdmin: authenticateAdmin,
};