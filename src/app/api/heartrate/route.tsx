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

    const averageHeartrateToday = await fetchAverageHeartrateFromDatabase(userId, 'today');
    const averageHeartrateWeek = await fetchAverageHeartrateFromDatabase(userId, 'week');

    const response = { averageHeartrateToday, averageHeartrateWeek };

    // Send the response
    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error('Error fetching average heartrate:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Define a function to fetch average heartrate data from the database
async function fetchAverageHeartrateFromDatabase(userId: string, period: string){
  let queryString: string;
  switch (period) {
    case 'today':
      queryString = `SELECT ROUND(AVG(heart_rate), 1) AS averageHeartrate FROM HeartRateRecord WHERE DATE(date) = CURDATE() AND user_id = ?`;
      break;
    case 'week':
      queryString = `SELECT ROUND(AVG(heart_rate), 1) AS averageHeartrate FROM HeartRateRecord WHERE WEEK(date) = WEEK(CURDATE()) AND user_id = ?`;
      break;
    default:
      throw new Error('Invalid period specified');
  }

  try {
    const [rows] = await DB.query(queryString, [userId]) as RowDataPacket[][];
    if (Array.isArray(rows) && rows.length > 0) {
      const { averageHeartrate } = rows[0];
        return averageHeartrate;
    }

    throw new Error(`Failed to fetch average heartrate for ${period}`);
  } catch (error: any) {
    console.error(`Error fetching average heartrate for ${period}:`, error);
    if (error.code) {
      console.error('SQL Error Code:', error.code);
      console.error('SQL Error Message:', error.message);
    }
    throw new Error(`Failed to fetch average heartrate for ${period}`);
  }
}