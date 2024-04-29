import { NextResponse } from "next/server";
import util from "util";
import bcrypt from 'bcrypt';
import DB from '@/../util/db';
import { ConnectingAirportsOutlined } from "@mui/icons-material";
//import { formattedDate } from './MyComponent.js';
//import pool from '@/../util/db';


const query = util.promisify(DB.query).bind(DB);




export const POST = async (req) => {
    const response = await req.json();
    const userid = response.userid;
    console.log(response);
    console.log(userid);
    //console.log(formattedDate);
    try{
        //const saltRounds = 10; 
        const tdate = new Date(response.Journal.date);
        const year = tdate.getFullYear();
        const month = String(tdate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth returns zero-based month
        const day = String(tdate.getDate()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day}`;
        const results = await query(
            "INSERT INTO Journal (date, symptom, description, severity, user_id) VALUES (?, ?, ?, ?, ?)",
            [formattedDate, response.Journal.symptom, response.Journal.description, response.Journal.severity, userid]
        );     
        
        if (results) {
            return NextResponse.json({ message: "Journal created successfully!" }, { status: 200 });
          } else {
            throw new Error("Failed to create Journal");
          }
    } catch(error) {
        console.error(error); //debug/home/martynas/ELDERHLTH/elderhealthnext-app/node_modules
        return NextResponse.json({ message: "Registration failed", error }, { status: 400 });
    }
}




