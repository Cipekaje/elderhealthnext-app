import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

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
  try {
    const payload = await request.json();
    const { userEmail, additionalInfo } = payload;

    if (!userEmail) {
      throw new Error("Nenurodytas el. paštas"); // Ensure email is available
    }

    // Create an array to hold SQL query parts and parameters
    let query = 'UPDATE User SET';
    const params = [];

    // Add fields to the query and parameters only if they're defined
    if (additionalInfo.gender) {
      query += ' gender = ?,';
      params.push(additionalInfo.gender);
    }
    if (additionalInfo.lastName) {
      query += ' lastName = ?,';
      params.push(additionalInfo.lastName);
    }
    if (additionalInfo.birthdate) {
      query += ' birthdate = ?,';
      params.push(additionalInfo.birthdate);
    }
    if (additionalInfo.weight) {
      query += ' weight = ?,';
      params.push(additionalInfo.weight);
    }
    if (additionalInfo.height) {
      query += ' height = ?,';
      params.push(additionalInfo.height);
    }
    if (additionalInfo.disease) {
      query += ' disease = ?,';
      params.push(additionalInfo.disease);
    }

    // Remove the trailing comma and add WHERE clause
    query = query.replace(/,$/, ''); // Remove trailing comma
    query += ' WHERE email = ?';
    params.push(userEmail);

    await pool.execute(query, params); // Execute the dynamically built query

    return NextResponse.json({
      status: 200,
      message: 'Informacija sėkmingai atnaujinta.',
    });
  } catch (error) {
    console.error("Klaida atnaujinant informaciją:", error);
    return NextResponse.json({
      status: 500,
      message: 'Klaida.',
    });
  }
}
