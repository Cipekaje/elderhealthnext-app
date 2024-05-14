import { NextRequest, NextResponse } from 'next/server';
import DB from '@/../util/db';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        if (req.method !== 'GET') {
            return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
        }

        const doctorId = req.nextUrl.searchParams.get("doctorId") as string;

        // Validate doctorId
        if (!doctorId) {
            return NextResponse.json({ message: 'Invalid doctorId' }, { status: 400 });
        }

        const patients = await fetchAllPatients(doctorId);

        return NextResponse.json(patients, { status: 200 }); 
    } catch (error) {
        console.error('Error fetching patients:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

async function fetchAllPatients(doctorId: string) {
    const queryString = `
      SELECT u.id, u.firstName, u.lastName, u.email, u.birthdate, u.gender
      FROM User u
      INNER JOIN Assigned_Doctors ad ON u.id = ad.userId
      WHERE ad.doctorId = ?`;

    try {
        // Execute SQL query
        const [rows] = await DB.query(queryString, [doctorId]) as any[][];
        return rows;
    } catch (error) {
        // Handle database errors
        console.error('Error fetching patients from database:', error);
        throw new Error('Error fetching patients from database');
    }
}
