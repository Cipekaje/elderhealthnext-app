import { NextRequest, NextResponse } from 'next/server';
import DB from '@/../util/db';
import { RowDataPacket } from 'mysql2/promise';

interface CurrentHeartrateResult {
    currentHeartrate: number;
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

        const currentHeartrate = await fetchCurrentHeartrate(userId);
        const response = { currentHeartrate };

        // Send the response
        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        // Handle any errors that occur during the database operation
        console.error('Error fetching average heartrate:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// Define a function to fetch current heartrate data from the database
async function fetchCurrentHeartrate(userId: string) {
    const queryString = `
    SELECT ROUND(heart_rate, 1) AS latestHeartrate 
    FROM HeartRateRecord 
    WHERE user_id = ? 
    ORDER BY date DESC, time DESC
    LIMIT 1
    `;

    try {
        const [rows] = await DB.query(queryString, [userId]) as RowDataPacket[][];
        if (Array.isArray(rows) && rows.length > 0) {
            const { latestHeartrate } = rows[0];
            return latestHeartrate;
        }

        throw new Error(`Failed to fetch latest heartrate for user ${userId}`);
    } catch (error: any) {
        console.error('Error fetching latest heartrate:', error);
        if (error.code) {
            console.error('SQL Error Code:', error.code);
            console.error('SQL Error Message:', error.message);
        }
        throw new Error(`Failed to fetch latest heartrate for user ${userId}`);
    }
}