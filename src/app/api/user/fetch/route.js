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
      const { userID } = await req.json();
      const connection = await pool.getConnection();
      console.log('supervisorID in API:', userID);

      const [rows] = await connection.query('SELECT user_id FROM user_supervisor WHERE supervisor_id = ?', [userID]);
    //   console.log('Query Result:', rows); // Log the query result
      // Release the connection back to the pool
      connection.release();
      
      if (rows.length > 0) {
          const userIDs = rows.map(row => row.user_id);
          console.log('Extracted userIDs:', userIDs);
          
          // Array to store user data
          const usersData = [];

          // Loop through each user ID and fetch additional data from the users table
          for (const userId of userIDs) {
              const [userData] = await connection.query('SELECT id, firstName, lastName, email FROM User WHERE id = ?', [userId]);
              if (userData.length > 0) {
                  usersData.push(userData[0]); // Add user data to the array
              }
          }

          console.log('Users Data:', usersData);

          // Return the list of user data
          return NextResponse.json({
              status: 200,
              usersData: usersData
          });
      } else {
          // If no rows were returned, handle accordingly
          return NextResponse.json({
              status: 404,
              message: 'No users found for the supervisor ID.'
          });
      }
  } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error:', error);
      return NextResponse.json({
          status: 500,
          message: 'Error! Please try again.',
      });
  }
}