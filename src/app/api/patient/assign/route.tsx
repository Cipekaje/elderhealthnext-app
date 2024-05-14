import { NextRequest, NextResponse } from 'next/server';
import DB from '@/../util/db';
import { RowDataPacket } from 'mysql2/promise';

interface RequestBody {
  doctorId: string;
  patientId: string;
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

    // Check if required fields are missing from req.body
    if (!('doctorId' in body) || !('patientId' in body)) {
      return NextResponse.json({ message: "Doctor ID or Patient ID is missing from request body" }, { status: 400 });
    }

    // Extract data from req.body and typecast it to RequestBody
    const { doctorId, patientId } = body;

    // Insert data into Assigned_Doctors table
    await insertAssignmentIntoDatabase(doctorId, patientId);

    // Send success response
    return NextResponse.json({ message: "Assignment created successfully" }, { status: 200 });

  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error('Error creating assignment:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Define a function to insert data into Assigned_Doctors table
async function insertAssignmentIntoDatabase(doctorId: string, patientId: string) {
  const queryString = `INSERT INTO Assigned_Doctors (doctorID, userID) VALUES (?, ?)`;

  try {
    await DB.query(queryString, [doctorId, patientId]);
  } catch (error: any) {
    console.error('Error inserting assignment into database:', error);
    throw new Error('Failed to create assignment');
  }
}