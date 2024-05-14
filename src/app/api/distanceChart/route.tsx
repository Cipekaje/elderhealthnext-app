import { NextRequest, NextResponse } from 'next/server';
import DB from '@/../util/db';
import { RowDataPacket } from 'mysql2/promise';

interface DistanceData {
    timestamp_date: string;
    distance: number;
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

        const distanceDataPastWeek = await fetchDistanceDataPastWeek(userId);

        // Send the response
        return NextResponse.json(distanceDataPastWeek, { status: 200 });

    } catch (error) {
        // Handle any errors that occur during the database operation
        console.error('Error fetching distance data:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// Define a function to fetch distance data from the database for the past week
async function fetchDistanceDataPastWeek(userId: string): Promise<DistanceData[]> {
    const queryString = `
        SELECT DATE(CONCAT(date, ' ', time)) AS timestamp_date, ROUND(SUM(distance), 3) AS distance
        FROM DistanceRecord 
        WHERE user_id = ? 
        AND DATE(CONCAT(date, ' ', time)) BETWEEN DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND CURDATE()
        GROUP BY DATE(CONCAT(date, ' ', time))
    `;

    try {
        const [rows] = await DB.query(queryString, [userId]) as RowDataPacket[][];
        const distanceData: DistanceData[] = [];

        if (Array.isArray(rows) && rows.length > 0) {
            rows.forEach(row => {
                distanceData.push({
                    timestamp_date: row.timestamp_date,
                    distance: row.distance
                });
            });
        }

        return distanceData;
    } catch (error: any) {
        console.error('Error fetching distance data for past week:', error);
        if (error.code) {
            console.error('SQL Error Code:', error.code);
            console.error('SQL Error Message:', error.message);
        }
        throw new Error('Failed to fetch distance data for past week');
    }
}
