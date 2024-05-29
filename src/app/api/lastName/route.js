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

export async function GET(request) {
  try {
    // Get the email from query parameters
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email'); // Ensure this is correctly retrieved

    if (!userEmail) {
      throw new Error("nenurodytas el. paštas"); // Handle missing email
    }

    const [rows] = await pool.execute(
      'SELECT lastName, isFirstLogin FROM User WHERE email = ?',
      [userEmail] // Query using email
    );

    if (rows.length === 0) {
      return NextResponse.json({ status: 404, message: "Vartotojas nerastas" });
    }

    const { lastName, isFirstLogin } = rows[0];

    return NextResponse.json({ status: 200, lastName, isFirstLogin }); // Return the last name
  } catch (error) {
    console.error("Klaida:", error); // Handle server errors
    return NextResponse.json({ status: 500, message: 'Serverio klaida.' });
  }
}
