import { NextResponse } from "next/server";
import util from "util";
import bcrypt from 'bcrypt';
import DB from '@/../util/db';
import pool from '@/../util/db';

const query = util.promisify(DB.query).bind(DB);

export const POST = async (req: Request, res: Response) => {
    const user = await req.json();
    const connection = await pool.getConnection();
    //console.log(user);
    try {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        const birthdate = new Date(user.birthdate);
        const year = birthdate.getFullYear();
        const month = String(birthdate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth returns zero-based month
        const day = String(birthdate.getDate()).padStart(2, '0');
        
        const formattedDate = `${year}-${month}-${day}`;
        const results = await connection.execute(
            "INSERT INTO User (firstName, lastName, password, email, birthdate) VALUES (?, ?, ?, ?, ?)",
            [user.firstName, user.lastName, hashedPassword, user.email, formattedDate]
        );   
        connection.release();  
        console.log("Query Results:", results);
       
        if (results) {
            return NextResponse.json({ message: "User created successfully!" , status: 200 });
        } else {
            throw new Error("Failed to create user");
        }
    } catch(error) {
        console.error(error); //debug
        return NextResponse.json({ message: "Registration failed", error ,  status: 400 });
    }
}
