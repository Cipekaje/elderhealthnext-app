import { NextResponse } from "next/server";
import util from "util";
import bcrypt from 'bcrypt';
import DB from '@/../util/db';
//import { formattedDate } from './MyComponent.js';

const query = util.promisify(DB.query).bind(DB);

export const POST = async (req) => {
    const { userID, ...user } = await req.json(); // Destructure userID from request body
    console.log('User ID REGISTER API:', userID); // Log user ID to console
    console.log(user);
    //console.log(formattedDate);
    try{
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        const birthdate = new Date(user.birthdate);
        const year = birthdate.getFullYear();
        const month = String(birthdate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth returns zero-based month
        const day = String(birthdate.getDate() + 1).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const results = await query(
                "INSERT INTO supervisors (firstName, lastname, password, email, birthDate, role) VALUES (?, ?, ?, ?, ?, ?)",
                [user.firstName, user.lastName, hashedPassword, user.email, formattedDate, user.role]
            );     
        if (results) {
            return NextResponse.json({ message: "User created successfully!" }, { status: 200 });
          } else {
            throw new Error("Failed to create user");
          }
    } catch(error) {
        console.error(error); //debug
        return NextResponse.json({ message: "Registration failed", error }, { status: 400 });
    }
}