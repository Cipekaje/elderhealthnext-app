import { NextResponse } from "next/server";
import util from "util";
import DB from '@/../util/db';
import { NextApiRequest, NextApiResponse } from 'next';

//import { formattedDate } from './MyComponent.js';



 
  //import bcrypt from 'bcrypt';
 
  import { ConnectingAirportsOutlined, Message } from "@mui/icons-material";
  import { QueryOptions } from 'mysql2/promise';
  //import { formattedDate } from './MyComponent.js';
  import pool from '@/../util/db';
  

  
  export const PUT = async (req: Request, res: Response) => {
      
          try {
              const connection = await pool.getConnection();
              const user = await req.json();
  
              //console.log(user);
              // Format the date parts into the desired format
              
              //console.log(FindDate2);
              // Assuming query is a function that correctly executes the SQL query
              const existingRecord = await connection.execute(
                "SELECT * FROM Data_averages WHERE user_id = ?",[user.userIdNumber]);
              //console.log(Object.keys(existingRecord[0]).length);
              if(user.AvgFirstDayHR != null){
                if (Object.keys(existingRecord[0]).length>0) {
                  // Update existing record
                  const results = await connection.execute(
                    "UPDATE Data_averages SET HeartRateDay = ?, HeartRateWeek = ?, HeartRateMonth = ? WHERE user_id = ?",
                    [user.AvgFirstDayHR, user.AvgFirstWeekHR, user.AvgFirstMonthHR, user.userIdNumber]
                  );
                
                  if (results) {
                    connection.release();
                    return NextResponse.json({ message: "User data updated successfully!" }, { status: 200 });
                  } else {
                    throw new Error("Failed to update user data");
                  }
                }else {
                  // Insert new record
                  const results = await connection.execute(
                    "INSERT INTO Data_averages (HeartRateDay, HeartRateWeek, HeartRateMonth, user_id) VALUES (?, ?, ?, ?)",
                    [user.AvgFirstDayHR, user.AvgFirstWeekHR, user.AvgFirstMonthHR, user.userIdNumber]
                  );
                
                  if (results) {
                    connection.release();
                    return NextResponse.json({ message: "New user data inserted successfully!" }, { status: 200 });
                  } else {
                    throw new Error("Failed to insert new user data");
                  }
                }
              }else{
                return NextResponse.json({ error: "Error fetching products" }, {status: 500});
              }
  
          } catch (error) {
              // Handle any potential errors
              console.error("Error fetching products:", error);
              return NextResponse.json({ error: "Error fetching products" }, {status: 500});
          }
  }
  
