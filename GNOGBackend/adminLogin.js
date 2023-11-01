const jwt = require('jsonwebtoken');
const { secretKeyJWT } = process.env;
const bcrypt = require('bcrypt'); 


async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

function generateToken(email, staff_id) {
  return jwt.sign({ email, staff_id }, process.env.secretKeyJWT, {
    expiresIn: '1h' // Token expiration time
  });
}

async function login(email, password) {
  const selectQuery = 'SELECT * FROM Admin WHERE email = ?';

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

    // Creating a JSON Web Token using the secret key from .env
    const token = generateToken(rows[0].email, rows[0].staff_id);
    return token;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  login: login,
  verifyPassword: verifyPassword,
  generateToken: generateToken
};
