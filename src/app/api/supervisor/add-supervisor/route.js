import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';
import Cryptr from 'cryptr';
import Env from '@/config/env';
import { render } from '@react-email/render';
import SupervisorInvitationEmail from '@/emails/SupervisorInvitationEmail';
import SupervisorInvitationEmailIfExists from '@/emails/SupervisorInvitationEmailIfExists';
import { sendEmail } from '@/config/mail';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'rlkscpvp',
  database: 'tempDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the POST function
export async function POST(request) {
  const body = await request.json(); // Parse request body
  const { userID, email } = body; // Destructure userID and email
  console.log("User ID ADD API:", userID); // Log user ID to console


  try {
    // console.log("TESTAS");
    const connection = await pool.getConnection();
    
    // Check if the supervisor exists
    const [supervisorRows] = await connection.execute('SELECT * FROM supervisors WHERE email = ?', [email]);
    
    if (supervisorRows.length === 0) {
      // const encodedUserID = encodeURIComponent(userID);

      // Construct the registration link with the encoded userID
      // const registerLink = `${Env.APP_URL}/RegisterSupervisor?userID=${encodedUserID}`;

      // Supervisor does not exist, create an invitation
      // const registerLink = `${Env.APP_URL}/RegisterSupervisor/${userID}`;// Include userID in registerLink
      const registerLink = `${Env.APP_URL}/RegisterSupervisor?userID=${userID}`; // Include userID 
      
      const html = render(
        <SupervisorInvitationEmail email={email} registerLink={registerLink} />
      );
      
      await sendEmail(email, 'Tapkite prižiūrėtoju', html);

      connection.release();
      
      return NextResponse.json({
        status: 200,
        message: 'Kvietimas buvo išsiųstas nurodytu el. pašto adresu.',
      });
    } else {
      // Supervisor already exists
      const registerLink = `${Env.APP_URL}/loginSupervisor?userID=${userID}`; // Include userID 
      const html = render(
        <SupervisorInvitationEmailIfExists email={email} registerLink={registerLink} />
      );
      await sendEmail(email, 'Tapkite prižiūrėtoju', html);
      connection.release();

      return NextResponse.json({
        status: 200,
        message: 'Kvietimas buvo išsiųstas nurodytu el. pašto adresu.',
        // status: 400,
        // message: 'This email is already registered as a Supervisor.',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      status: 500,
      message: 'Error! Please try again.',
    });
  }
}
