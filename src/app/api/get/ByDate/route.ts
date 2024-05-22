import { NextRequest, NextResponse } from 'next/server';
import { URLSearchParams } from 'url';
import util from "util";
import DB from '@/../util/db';
import pool from '@/../util/db';

const query = util.promisify(DB.query).bind(DB);

interface CustomRequest extends Request {
    FindDate: string; // Define your custom property here
}

export const GET = async (req: CustomRequest, res: Response) => {
    try {
        const connection = await pool.getConnection();
        const url = new URL(req.url);
        const params = new URLSearchParams(url.search);
        const FindDate = params.get('FindDate');
        const UserId = params.get('userid');
        console.log(UserId);
        console.log(FindDate);
        let UserID: string | undefined = UserId?.substring(1, 11); 
        let FindDate2: string | undefined = FindDate?.substring(1, 11); // Keep the date in 'YYYY-MM-DD' format

        console.log(FindDate2);

        if (FindDate2) {
            // Increment the date by one day
            const dateParts = FindDate2.split('-');
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Month is 0-based in JavaScript
            const day = parseInt(dateParts[2], 10);

            const nextDate = new Date(year, month, day);
            nextDate.setDate(nextDate.getDate());

            const nextYear = nextDate.getFullYear();
            const nextMonth = String(nextDate.getMonth() + 1).padStart(2, '0');
            const nextDay = String(nextDate.getDate()).padStart(2, '0');

            FindDate2 = `${nextYear}-${nextMonth}-${nextDay}`;

            console.log(FindDate2);

            // Assuming query is a function that correctly executes the SQL query
            const result = await connection.execute(
                "SELECT date, symptom, severity, description FROM Journal WHERE date = ? AND user_id = ?", [FindDate2, UserID]  // Your SQL query
                // You can add more options here if needed, such as parameters
            );
            console.log(result);
            connection.release();
            return NextResponse.json({ Message: "OK", result: result[0] }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Invalid FindDate" }, { status: 400 });
        }

    } catch (error) {
        // Handle any potential errors
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
    }
}

