const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'test123'; // Use a secure secret key for JWT

async function login(email, password, connection) {
  const selectQuery = 'SELECT * FROM staff WHERE email = ?';

  try {
    const [rows] = await connection.execute(selectQuery, [email]);

    if (rows.length === 0) {
      throw new Error('Invalid email or password');
    }

    const storedPassword = rows[0].password;
    const isPasswordValid = await verifyPassword(password, storedPassword);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ email: rows[0].email, staff_id: rows[0].staff_id }, secretKey, {
      expiresIn: '1h' // Token expiration time
    });

    return token;
  } catch (error) {
    throw error;
  }
}

async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  login: login
};
