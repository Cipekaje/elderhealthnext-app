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
    const connection = await pool.getConnection();
    
    const [rows] = await connection.query('SELECT role FROM supervisors WHERE email = ?', [email]);
    
    // Release the connection back to the pool
    connection.release();
    
    if (rows.length > 0) {
      const { role } = rows[0];
      
      if (role === 'supervisor') {
        return NextResponse.json({
          status: 200,
          role: 'supervisor'
        });
      } else {
        // cia prideti kitas roles 
        return NextResponse.json({
          status: 200,
          role: 'user'
        });
      }
    } else {
      // laikinas cia fix, cia turetu grazinti "user nera"
      return NextResponse.json({
        status: 200,
        role: 'user'
      });
    }
  } catch (error) {
    // error
    console.error('Error:', error);
    return NextResponse.json({
      status: 500,
      message: 'Error! Please try again.',
    });
  }
}
