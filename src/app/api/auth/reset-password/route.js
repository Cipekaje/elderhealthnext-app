import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

// MySQL connection pool setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'rlkscpvp',
  database: 'tempDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(request) {
  const payload = await request.json();
  const { currentPassword, newPassword, userId } = payload;

  if (!currentPassword || !newPassword) {
    return NextResponse.json({
      status: 400,
      message: 'Ne visi laukai užpildyti.',
    });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM User WHERE id = ?',[userId]  
    );

    if (rows.length === 0) {
      return NextResponse.json({
        status: 404,
        message: 'Vartotojas nerastas.',
      });
    }

    const user = rows[0];
    const lastName = rows[0].lastName;

    // Compare plaintext password with stored hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({
        status: 400,
        message: 'Dabartinis slaptažodis netinka.',
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await connection.execute('UPDATE User SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

    return NextResponse.json({
      status: 200,
      message: 'Slaptažodis sėkmingai pakeistas.',
      lastName
    });

  } catch (error) {
    console.error('Klaida keičiant slaptažodį:', error);
    return NextResponse.json({
      status: 500,
      message: 'Klaida! Bandykite vėliau.',
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}