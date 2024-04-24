import { NextRequest, NextResponse } from 'next/server';
import util from "util";
//import bcrypt from 'bcrypt';
import DB from '@/../util/db';
import { ConnectingAirportsOutlined, Message } from "@mui/icons-material";
import { QueryOptions } from 'mysql2/promise';
//import { formattedDate } from './MyComponent.js';
import pool from '@/../util/db';


const query = util.promisify(DB.query).bind(DB);

interface CustomRequest extends Request {
    FindDate: string; // Define your custom property here
}

export const GET = async (req: CustomRequest, res: Response) => {
    
        try {
            const connection = await pool.getConnection();
            const url = new URL (req.url);
            const params = new URLSearchParams(url.search);
            const FindDate = params.get('FindDate');
            // Extract year, month, and day from the Date object


            // Format the date parts into the desired format
            const FindDate2 = FindDate?.substring(1, 11);
            //console.log(FindDate2);
            // Assuming query is a function that correctly executes the SQL query
            const result = await connection.execute(
                "SELECT date, symptom, description FROM Journal WHERE date = ?", [FindDate2]// Your SQL query
                // You can add more options here if needed, such as parameters
            );
            console.log(result);
            connection.release();
            return NextResponse.json({Message:"OK", result: result[0]}, {status:200});

        } catch (error) {
            // Handle any potential errors
            console.error("Error fetching products:", error);
            return NextResponse.json({ error: "Error fetching products" }, {status: 500});
        }
}
