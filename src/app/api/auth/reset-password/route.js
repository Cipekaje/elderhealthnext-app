import { connect } from "@/database/mysql.config";
import Cryptr from "cryptr";
import Env from "@/config/env";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

connect();

export async function POST(request) {
  const payload = await request.json();

  // * Decrypt string
  const crypter = new Cryptr(Env.SECRET_KEY);
  const email = crypter.decrypt(payload.email);

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "rlkscpvp",
    database: "tempDB",
  });

  try {
    // Find user in the database
    const [rows] = await connection.execute(
      "SELECT * FROM User WHERE email = ?",
      [email, payload.signature]
    );

    if (rows.length === 0) {
      return {
        status: 400,
        message: "Reset URL is not correct. Please double-check it.",
      };
    }

    const user = rows[0];

    // Hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(payload.password, salt);

    // Update user's password and reset token in the database
    await connection.execute(
      "UPDATE User SET password = ?, WHERE id = ?",
      [hashedPassword, user.id]
    );

    return {
      status: 200,
      message: "Password changed successfully. Please login with the new password.",
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      message: "Something went wrong. Please try again!",
    };
  } finally {
    await connection.end();
  }
}
