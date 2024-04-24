import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import { compare } from 'bcrypt'
import pool from '@/../util/db';

const authConfig = {
    providers: [
        CredentialsProvider({
            name: "signIn",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (
                    !credentials ||
                    !credentials.email ||
                    !credentials.password
                ) {
                    return null;
                }

                try {
                    // Query the database to find the user by email
                    const [rows, fields] = await pool.query('SELECT id, email, firstName, lastName, password FROM User WHERE email = ?', [credentials.email]);

                    // If a user is found
                    if (rows.length > 0) {
                        const user = rows[0];
                        // Assuming password is stored in the database
                        if (await compare(credentials.password, user.password)) {
                            // Return the user information
                            return {
                                id: user.id.toString(),
                                email: user.email,
                                name: user.firstName,
                                lastName: user.lastName,
                                // Add other user information as needed
                                userInfo: {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    birthdate: user.birthdate
                                  }
                            };
                        }
                    }
                } catch (error) {
                    console.error('Error executing query:', error);
                    throw error;
                }

                return null; // Return null if user not found or password doesn't match
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.userInfo = user.userInfo;
                token.lastName = user.lastName; // Include user information in the JWT token
            }
            return token;
        },
        async session({ session, token }) {
            if (token && token.id && token.userInfo) {
                session.user.id = token.id;
                session.user.userInfo = token.userInfo;
                session.user.lastName = token.lastName; // Include user information in the session
            }
            return session;
        },
    },
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };