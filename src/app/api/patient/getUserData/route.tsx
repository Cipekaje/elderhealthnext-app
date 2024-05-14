import { NextRequest, NextResponse } from 'next/server';
import DB from '@/../util/db';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        if (req.method !== 'GET') {
            return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
        }

        const userID = req.nextUrl.searchParams.get("userID") as string;

        // Validate doctorId
        if (!userID) {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        const userData = await fetchUserData(userID);

        return NextResponse.json(userData, { status: 200 }); 
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

async function fetchUserData(userID: string) {
    const queryString = `
      SELECT id, firstName, lastName, email, birthdate, gender, weight, height, disease
      FROM User
      WHERE id = ?`;

    try {
        // Execute SQL query
        const [rows] = await DB.query(queryString, [userID]) as any[][];
        return rows;
    } catch (error) {
        // Handle database errors
        console.error('Error fetching patients from database:', error);
        throw new Error('Error fetching patients from database');
    }
}
