import { NextResponse } from "next/server";
import util from "util";
import bcrypt from 'bcrypt';
import DB from '@/../util/db';
//import { formattedDate } from './MyComponent.js';

const query = util.promisify(DB.query).bind(DB);

export const POST = async (req) => {
    const Journal = await req.json();
    console.log(Journal);
    //console.log(formattedDate);
    try{
        const saltRounds = 10; 
        const tdate = new Date(Journal.date);
        const year = tdate.getFullYear();
        const month = String(tdate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth returns zero-based month
        const day = String(tdate.getDate() + 1).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day}`;
        const results = await query(
            "INSERT INTO Journal (date, symptom, description) VALUES (?, ?, ?)",
            [formattedDate, Journal.symptom, Journal.description]
        );     
        
        if (results) {
            return NextResponse.json({ message: "Journal created successfully!" }, { status: 200 });
          } else {
            throw new Error("Failed to create Journal");
          }
    } catch(error) {
        console.error(error); //debug
        return NextResponse.json({ message: "Registration failed", error }, { status: 400 });
    }
}


export const GET = async (req) => {
    try {
        const FindDate = req.query.FindDate; // Assuming FindDate is sent in the request body

        if (!FindDate) {
            return NextResponse.json({ message: "FindDate is required" }, { status: 400 });
        }

        // Fetch journal entries from the database where journal.date matches FindDate
        const journals = await query(
            "SELECT * FROM Journal WHERE date = ?",
            [FindDate]
        );

        return NextResponse.json({ journals }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch journals", error }, { status: 500 });
    }
}
