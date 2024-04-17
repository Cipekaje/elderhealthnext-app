import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';
import Cryptr from 'cryptr';
import Env from '@/config/env';
import { render } from '@react-email/render';
import ForgotPasswordEmail from '@/emails/ForgotPasswordEmail';
import { sendEmail } from '@/config/mail';

import bcrypt from 'bcrypt'

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'rlkscpvp',
  database: 'tempDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to generate a random password
function generateRandomPassword(length = 10) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

// Export the POST function
export async function POST(request) {
  const payload = await request.json();

  try {
    const connection = await pool.getConnection();
    
    // Check if user exists
    const [rows] = await connection.execute('SELECT * FROM User WHERE email = ?', [payload.email]);
    
    if (rows.length === 0) {
      connection.release();
      return NextResponse.json({
        status: 400,
        errors: {
          email: 'Toks vartotojas nerastas.',
        },
      });
    }

    const user = rows[0];

    // Generate a new random password
    const newPassword = generateRandomPassword(12); // Generate a 12-character long password
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds
    
    // Update user record with the hashed password
    await connection.execute('UPDATE User SET password = ? WHERE id = ?', [hashedPassword, user.id]);
    
    connection.release();

    const html = render(
      <ForgotPasswordEmail name={user.name} newPassword={newPassword} />
    );

    await sendEmail(payload.email, 'Reset Password', html);

    return NextResponse.json({
      status: 200,
      message: 'Naujas slaptažodis išsiųstas į el. paštą.',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      status: 500,
      message: 'Klaida! Bandykite dar kartą',
    });
  }
}