import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'rlkscpvp',
  database: 'tempDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    console.log('Email:', email);
    const connection = await pool.getConnection();

    const [supervisorRows] = await connection.query('SELECT role FROM supervisors WHERE email = ?', [email]);
    console.log('Rows from supervisors:', supervisorRows);

    connection.release();

    if (supervisorRows.length > 0) {
      const { role } = supervisorRows[0];

      if (role === 'supervisor') {
        return NextResponse.json({
          status: 200,
          role: 'supervisor'
        });
      }
    }

    const connection2 = await pool.getConnection();
    const [userRows] = await connection2.query('SELECT role FROM User WHERE email = ?', [email]);
    console.log('Rows from User:', userRows);
    connection2.release();
    
    if (userRows.length > 0) {
      const { role } = userRows[0];
      if (role === 'doctor') {
        return NextResponse.json({
          status: 200,
          role: 'doctor'
        });
      } else {
        return NextResponse.json({
          status: 200,
          role: 'user'
        });
      }
    } else {
      return NextResponse.json({
        status: 404,
        message: 'User not found'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      status: 500,
      message: 'Error! Please try again.',
    });
  }
}
