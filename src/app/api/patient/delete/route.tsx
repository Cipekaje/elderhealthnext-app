import { NextRequest, NextResponse } from 'next/server';
import DB from '@/../util/db';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        if (req.method !== 'POST') {
            return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
        }

        const body = await req.json();

        // Check if req.body is null
        if (!body) {
            return NextResponse.json({ message: 'Request body is missing' }, { status: 400 });
        }

        // Check if req.body.doctorID or req.body.patientID is missing
        if (!('doctorID' in body) || !('patientID' in body)) {
            return NextResponse.json({ message: 'Doctor ID or Patient ID is missing from request body' }, { status: 400 });
        }

        const { doctorID, patientID } = body;
        
        await deletePatientFromAssignedDoctors(doctorID, patientID);

        return NextResponse.json({ message: 'Patient deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting patient:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

async function deletePatientFromAssignedDoctors(doctorID: string, patientID: string) {
    const queryString = `
        DELETE FROM Assigned_Doctors
        WHERE doctorID = ? AND userID = ?;
    `;

    try {
        await DB.query(queryString, [doctorID, patientID]);
    } catch (error) {
        console.error('Error deleting patient from Assigned_Doctors table:', error);
        throw error;
    }
}