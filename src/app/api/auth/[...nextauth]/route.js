import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextResponse } from "next/server";
import util from "util";
import bcrypt from 'bcrypt';
import DB from '@/../util/db';

const query = util.promisify(DB.query).bind(DB);

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers:[
        CredentialsProvider({
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password){
                    return null;
                }
                const user = await query('SELECT * FROM User WHERE email = ?', [credentials.email]);

                if (!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if (passwordMatch) {
                    return user;
                } else {
                    return null;
                }
            },
        }),   
    ],
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}