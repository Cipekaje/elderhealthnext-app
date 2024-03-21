import { NextResponse } from "next/server";
import util from "util";
import bcrypt from 'bcrypt';
import DB from '@/../util/db';

const query = util.promisify(DB.query).bind(DB);

export const POST = async (req) => {
    const user = await req.json();
    console.log(user);
    try{
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const results = await query(
            "INSERT INTO User (username, password, email) VALUES (?, ?, ?)",
            [user.username, hashedPassword, user.email]
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