import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';


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
  try {
    const payload = await request.json();
    const { userEmail, additionalInfo } = payload;

    // Check if userEmail is provided
    if (!userEmail) {
      throw new Error("Klaida su (el. paštas)!");
    }

    // Execute the update based on email
    await pool.execute(
      'UPDATE User SET gender = ?, lastName = ?, birthdate = ?, weight = ?, height = ?, disease = ? WHERE email = ?',
      [
        additionalInfo.gender,
        additionalInfo.lastName,
        additionalInfo.birthdate,
        additionalInfo.weight,
        additionalInfo.height,
        additionalInfo.disease,
        userEmail, 
      ]
    );

    return NextResponse.json({
      status: 200,
      message: 'Vartotojo informacija sėkmingai atnaujinta.',
    });
  } catch (error) {
    console.error("Klaida atnaujinant informaciją:", error);
    return NextResponse.json({
      status: 500,
      message: 'Serverio klaida.',
    });
  }
}