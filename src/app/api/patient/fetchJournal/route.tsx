import { NextRequest, NextResponse } from 'next/server';
import DB from '@/../util/db';
import { RowDataPacket } from 'mysql2/promise';

interface JournalEntry {
    date: string;
    symptom: string;
    description: string;
    severity: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // Extract user ID from query parameters
        const userId = req.nextUrl.searchParams.get("userId") as string;

        // Fetch journal entries for the user
        const journalEntries = await fetchJournalEntries(userId);

        // Send the response with the fetched data
        return NextResponse.json(journalEntries, { status: 200 });
    } catch (error) {
        console.error('Error fetching journal entries:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

async function fetchJournalEntries(userId: string): Promise<JournalEntry[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const formattedDate = oneMonthAgo.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const queryString = `
        SELECT date, symptom, description, severity
        FROM Journal 
        WHERE user_id = ?
        AND date >= ?
        ORDER BY date DESC
    `;

    try {
        const [rows] = await DB.query(queryString, [userId, formattedDate]) as RowDataPacket[][];
        const journalEntries: JournalEntry[] = [];

        if (Array.isArray(rows) && rows.length > 0) {
            rows.forEach(row => {
                journalEntries.push({
                    date: row.date,
                    symptom: row.symptom,
                    description: row.description,
                    severity: row.severity
                });
            });
        }

        return journalEntries;
    } catch (error: any) {
        console.error('Error fetching journal entries:', error);
        if (error.code) {
            console.error('SQL Error Code:', error.code);
            console.error('SQL Error Message:', error.message);
        }
        throw new Error('Failed to fetch journal entries');
    }
}