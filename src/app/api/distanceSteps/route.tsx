import { NextRequest, NextResponse } from 'next/server';
import DB from '@/../util/db';
import { RowDataPacket } from 'mysql2/promise';

interface UserActivityData {
  distanceWalked: number[];
  stepsMade: number[];
}

interface RequestBody {
  userId: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ message: "Metodas neleidžiamas" }, { status: 405 });
    }

    const body = await req.json();

    if (!body) {
      return NextResponse.json({ message: "Klaida" }, { status: 400 });
    }

    if (!('userId' in body)) {
      return NextResponse.json({ message: "Nėra tokio ID" }, { status: 400 });
    }
    const { userId } = body;

    const userActivityData = await fetchUserActivityData(userId);

    return NextResponse.json(userActivityData, { status: 200 });

  } catch (error) {
    console.error('Klaida siunčiant duomenis:', error);
    return NextResponse.json({ message: "Serverio klaida" }, { status: 500 });
  }
}

async function fetchUserActivityData(userId: string): Promise<UserActivityData> {
  const distanceQueryString = `
    SELECT DATE(date) as date, ROUND(AVG(distance), 1) AS avgDistanceWalked
    FROM DistanceRecord 
    WHERE user_id = ? 
    AND DATE(date) BETWEEN DATE_SUB(CURDATE(), INTERVAL 8 DAY) AND CURDATE()
    GROUP BY DATE(date)
  `;

  const stepsQueryString = `
    SELECT DATE(date) as date, SUM(steps) AS totalStepsMade
    FROM StepRecord 
    WHERE user_id = ? 
    AND DATE(date) BETWEEN DATE_SUB(CURDATE(), INTERVAL 8 DAY) AND CURDATE()
    GROUP BY DATE(date)
  `;

  try {
    const [distanceRows] = await DB.query(distanceQueryString, [userId]) as RowDataPacket[][];
    const [stepsRows] = await DB.query(stepsQueryString, [userId]) as RowDataPacket[][];

    const distanceWalked = Array(9).fill(0);
    const stepsMade = Array(9).fill(0);

    if (Array.isArray(distanceRows) && distanceRows.length > 0) {
      distanceRows.forEach(row => {
        const date = new Date(row.date);
        const daysAgo = Math.abs(Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)) - 8);
        distanceWalked[daysAgo] = row.avgDistanceWalked;
      });
    }

    if (Array.isArray(stepsRows) && stepsRows.length > 0) {
      stepsRows.forEach(row => {
        const date = new Date(row.date);
        const daysAgo = Math.abs(Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)) - 8);
        stepsMade[daysAgo] = row.totalStepsMade;
      });
    }

    return { distanceWalked, stepsMade };
  } catch (error: any) {
    console.error('Klaida siunčiant naudotojo duomenis:', error);
    if (error.code) {
      console.error('SQL klaidos kodas:', error.code);
      console.error('SQL klaidos žinutė:', error.message);
    }
    throw new Error('Nepavyko nusiųsti duomenų');
  }
}