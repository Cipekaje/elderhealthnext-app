import { NextRequest, NextResponse } from 'next/server';
import util from 'util';
import DB from '@/../util/db';
import pool from '@/../util/db';
import { QueryOptions, RowDataPacket } from 'mysql2/promise';

const query = util.promisify(DB.query).bind(DB);

interface CustomRequest extends Request {
  FindDate: string; // Define your custom property here
}
interface QueryResultItem {
  averageHR: string; // Assuming 'averageHR' is a string
  // Add other properties as needed
}

export const GET = async (req: CustomRequest, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);
    const UserID = params.get('userid');

    console.log(UserID);

    if (UserID != null) {
      let TodaySteps = null;
      let TodayHR = null;
      let stepsError = null;
      let hrError = null;

      try {
        TodaySteps = await fetchAverageHeartrateFromDatabase(UserID, 'daySteps');
      } catch (error) {
        console.error("Error fetching steps:", error);
        stepsError = "Failed to fetch steps data";
      }

      try {
        TodayHR = await fetchAverageHeartrateFromDatabase(UserID, 'dayHR');
      } catch (error) {
        console.error("Error fetching heart rate:", error);
        hrError = "Failed to fetch heart rate data";
      }

      connection.release();

      const result = { TodaySteps, TodayHR };
      console.log(result);
      const errorMessages = { stepsError, hrError };

      if (stepsError || hrError) {
        return NextResponse.json({ Message: "Partial data fetched", result, errors: errorMessages }, { status: 206 });
      }

      return NextResponse.json({ Message: "OK", result }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User ID is missing" }, { status: 400 });
    }
  } catch (error) {
    // Handle any potential errors
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: "Error in GET request" }, { status: 500 });
  }
}

async function fetchAverageHeartrateFromDatabase(userId: string, period: string) {
  let queryString: string;
  switch (period) {
    case 'daySteps':
      queryString = `
      SELECT hour(time) as Hour, sum(steps) as Steps
        FROM StepRecord
        WHERE user_id = ${userId} AND date = CURDATE()
        GROUP BY hour(time);
      `;
      break;
    case 'dayHR':
      queryString = `
      SELECT hour(time) as Hour, ROUND(AVG(heart_rate), 1) as HR
      FROM HeartRateRecord
      WHERE user_id = ${userId} AND date = CURDATE()
      GROUP BY hour(time);
      `;
      break;
    default:
      throw new Error('Invalid period specified');
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await DB.query(queryString, [userId]) as RowDataPacket[][];
    connection.release();
    
    if (Array.isArray(rows) && rows.length > 0) {
      return rows;
    }

    throw new Error(`No data found for ${period}`);
  } catch (error: any) {
    console.error(`Error fetching data for ${period}:`, error);
    throw new Error(`Failed to fetch data for ${period}`);
  }
}
