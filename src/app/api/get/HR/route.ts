import { NextRequest, NextResponse } from 'next/server';
import util from "util";
//import bcrypt from 'bcrypt';
import DB from '@/../util/db';
import { ConnectingAirportsOutlined, Message } from "@mui/icons-material";
import { QueryOptions, RowDataPacket } from 'mysql2/promise';
//import { formattedDate } from './MyComponent.js';
import pool from '@/../util/db';


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
    //const UserID = UsID?.substring(1, UsID.length-1);

    console.log(UserID);

    if (UserID != null) {
      const averageHRFirstDay = await fetchAverageHeartrateFromDatabase(UserID, 'day');
      const averageHRFirstWeek = await fetchAverageHeartrateFromDatabase(UserID, 'week');
      const averageHRFirstMonth = await fetchAverageHeartrateFromDatabase(UserID, 'month');
      //const averageHRFirstMonthALL = await fetchAverageHeartrateFromDatabase(UserID, 'monthAll');
      const result = { averageHRFirstDay, averageHRFirstWeek, averageHRFirstMonth };
      connection.release();

      console.log(result);

      return NextResponse.json({ Message: "OK", result: result }, { status: 200 });
    }
    else return NextResponse.json({ message: "User ID is missing" }, { status: 400 });
  } catch (error) {
    // Handle any potential errors
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}

async function fetchAverageHeartrateFromDatabase(userId: string, period: string) {
  let queryString: string;
  switch (period) {
    case 'day':
      queryString = `SELECT ROUND(AVG(heart_rate), 1) AS averageHR
        FROM HeartRateRecord 
        WHERE user_id = ${userId} 
        AND date = (SELECT MIN(date) FROM HeartRateRecord WHERE user_id = ${userId})`;

      break;
    case 'week':
      queryString = `
        SELECT ROUND(AVG(heart_rate), 1) AS averageHR
        FROM HeartRateRecord 
        RIGHT JOIN (
            SELECT MIN(date) AS start_date, DATE_ADD(MIN(date), INTERVAL 6 DAY) AS end_date
            FROM HeartRateRecord 
            WHERE user_id = ${userId}
        ) AS date_range
        ON HeartRateRecord.date >= date_range.start_date AND HeartRateRecord.date <= date_range.end_date
        WHERE user_id = ${userId} 
        `;


      break;
    case 'month':
      queryString = `
        SELECT ROUND(AVG(heart_rate), 1) AS averageHR
        FROM HeartRateRecord 
        RIGHT JOIN (
            SELECT MIN(date) AS start_date, DATE_ADD(MIN(date), INTERVAL 29 DAY) AS end_date
            FROM HeartRateRecord 
            WHERE user_id = ${userId}
        ) AS date_range
        ON HeartRateRecord.date >= date_range.start_date AND HeartRateRecord.date <= date_range.end_date
        WHERE user_id = ${userId} 
        `;
      break;
    default:
      throw new Error('Invalid period specified');
  }

  try {
    const connection = await pool.getConnection();
    const rows = await connection.execute(queryString);
    //console.log(rows);
    if (rows.length > 0) {
      const averageHR = rows[0];
      return averageHR;
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