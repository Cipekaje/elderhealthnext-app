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
  const payload = await request.json();
  const { userId, height, weight, disease } = payload;

  if (!userId) {
    return NextResponse.json({
      status: 400,
      message: 'Vartotojo ID nebuvo pateikta.',
    });
  }

  let connection;
  try {
    connection = await pool.getConnection();

    const [userRows] = await connection.execute('SELECT * FROM User WHERE id = ?', [userId]);
    if (userRows.length === 0) {
      return NextResponse.json({
        status: 404,
        message: 'Vartotojas nerastas.',
      });
    }
    let sql = 'UPDATE User SET ';
let params = [];

if (height !== undefined && height !== '') {
  sql += 'height = ?, ';
  params.push(parseInt(height)); 
}
if (weight !== undefined && weight !== '') {
  sql += 'weight = ?, ';
  params.push(parseFloat(weight)); 
}
if (disease !== undefined && disease !== '') {
  sql += 'disease = ?, ';
  params.push(disease);
}
sql = sql.slice(0, -2);

sql += ' WHERE id = ?';
params.push(userId);

    await connection.execute(sql, params);

    return NextResponse.json({
      status: 200,
      message: 'Duomenys sėkmingai atnaujinti.',
    });
  } catch (error) {
    console.error('Klaida atnaujinant vartotojo duomenis:', error);
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
