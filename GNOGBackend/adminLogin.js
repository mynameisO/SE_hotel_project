const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

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

async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

function generateToken(user) {
  const { staff_id, fname, lname, email } = user;
  return jwt.sign({ staff_id, fname, lname, email }, process.env.secretKeyJWT, {
    expiresIn: '300000ms', // Token expiration time in milliseconds
  });
}

async function login(email, password) {
  try {
    // Retrieve admin data from the database based on the email
    const [rows] = await pool.execute('SELECT * FROM Admin WHERE email = ?', [email]);

    if (rows.length === 0) {
      throw new Error('Invalid email or password');
    }

    const storedPassword = rows[0].password;

    // Verify the password
    const isPasswordValid = await verifyPassword(password, storedPassword);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Create a JWT token
    const token = generateToken(rows[0]);

    return {
      status: 'ok',
      message: 'Logged in',
      accessToken: token,
      expiresIn: 300000,
      user: {
        staff_id: rows[0].staff_id,
        fname: rows[0].fname,
        lname: rows[0].lname,
        email: rows[0].email,
      },
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  login: login,
  verifyPassword: verifyPassword,
  generateToken: generateToken
};
