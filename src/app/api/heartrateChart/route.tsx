import { NextRequest, NextResponse } from 'next/server';
import DB from '@/../util/db';
import { RowDataPacket } from 'mysql2/promise';

interface AverageHeartrateResult {
  averageHeartrate: number;
}

interface RequestBody {
  userId: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
    }

    const body = await req.json();

    // Check if req.body is null
    if (!body) {
      return NextResponse.json({ message: "Request body is missing" }, { status: 400 });
    }

    // Check if req.body.userId is null or undefined
    if (!('userId' in body)) {
      return NextResponse.json({ message: "User ID is missing from request body" }, { status: 400 });
    }

    // Extract userId from req.body and typecast it to RequestBody
    const { userId } = body;

    const averageHeartratesPastNineDays = await fetchAverageHeartratesPastNineDays(userId);

    // Send the response
    return NextResponse.json(averageHeartratesPastNineDays, { status: 200 });

  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error('Error fetching average heartrate:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Define a function to fetch average heartrate data from the database for the past 9 days
async function fetchAverageHeartratesPastNineDays(userId: string) {
    const queryString = `
      SELECT DATE(date) as date, ROUND(AVG(heart_rate), 1) AS averageHeartrate
      FROM HeartRateRecord 
      WHERE user_id = ? 
      AND DATE(date) BETWEEN DATE_SUB(CURDATE(), INTERVAL 8 DAY) AND CURDATE()
      GROUP BY DATE(date)
    `;
  
    try {
      const [rows] = await DB.query(queryString, [userId]) as RowDataPacket[][];
      const averageHeartrates = Array(9).fill(0);
  
      if (Array.isArray(rows) && rows.length > 0) {
        rows.forEach(row => {
          const date = new Date(row.date);
          const daysAgo = Math.abs(Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)) - 8);
          averageHeartrates[daysAgo] = row.averageHeartrate;
        });
      }
  
      return averageHeartrates;
    } catch (error: any) {
      console.error('Error fetching average heartrates for past 9 days:', error);
      if (error.code) {
        console.error('SQL Error Code:', error.code);
        console.error('SQL Error Message:', error.message);
      }
      throw new Error('Failed to fetch average heartrates for past 9 days');
    }
  }