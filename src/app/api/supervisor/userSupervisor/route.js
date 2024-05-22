import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';
import Cryptr from 'cryptr';
import Env from '@/config/env';
import { render } from '@react-email/render';

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

// Export the POST function
export const POST = async (req) => {
  const { email, userID } = await req.json(); // Destructure email and userID from request body
  console.log('User ID LOGIN API:', userID); // Log user ID to console
  console.log('User email LOGIN API:', email);

  try {
      const connection = await pool.getConnection();

      // Execute SQL query to find supervisor's ID based on email
      const [rows] = await connection.query('SELECT id FROM supervisors WHERE email = ?', [email]);

      if (rows.length > 0) {
          const supervisorId = rows[0].id;
          console.log('Supervisor ID:', supervisorId);

          // Execute SQL query to insert new entry into userSupervisor table
          await connection.query('INSERT INTO user_supervisor (user_id, supervisor_id) VALUES (?, ?)', [userID, supervisorId]);
          
          connection.release(); // Release the connection

          // Return success response
          return NextResponse.json({
              status: 200,
              message: 'Naudotojo ir prižiūrėtojo ryšys sėkmingai pridėtas',
          });
      } else {
          // If no supervisor found with the provided email
          connection.release(); // Release the connection
          return NextResponse.json({
              status: 404,
              message: 'Suteikto el. pašto naudotojas nerastas',
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
