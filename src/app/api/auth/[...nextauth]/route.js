import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
import { compare } from 'bcrypt'
import pool from '@/../util/db';

const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile) {
                // Modify the default profile returned by Google if necessary
                return {
                  id: profile.sub,
                  email: profile.email,
                  name: profile.name,
                  firstName: profile.given_name,
                  lastName: profile.family_name,
                };
            },
          }),

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
                    const [userRows, userFields] = await pool.query('SELECT id, email, firstName, lastName, birthdate, password, role FROM User WHERE email = ?', [credentials.email]);
                    // If a user is found
                    if (userRows.length > 0) {
                        const user = userRows[0];
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
                                    birthdate: user.birthdate,
                                    role: user.role
                                }
                            };
                        }
                    }

                    // If user is not found, check the supervisor table
                    const [supervisorRows, superFields] = await pool.query('SELECT id, email, firstName, lastname, birthDate, password, role FROM supervisors WHERE email = ?', [credentials.email]);

                    // If a user is found
                    if (supervisorRows.length > 0) {
                        const user = supervisorRows[0];
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
                                    birthdate: user.birthdate,
                                    role: user.role
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
        async signIn({ account, profile }) {
            if (account.provider === "google") {
              const email = profile.email;

      
              try {
                const [rows] = await pool.query(
                  "SELECT id FROM User WHERE email = ?",
                  [email]
                );
      
                if (rows.length === 0) {
                  // User does not exist, insert them into the database
                  await pool.query(
                    "INSERT INTO User (email, firstName, lastName, password, birthdate) VALUES (?, ?, ?, ?, ?)",
                    [email, profile.given_name, "nenurodyta", "NULL", "0000-00-00"]
                  );
                }
      
                return true; // Allow sign-in
              } catch (error) {
                console.error("Database error during sign-in:", error);
                return false; // Disallow sign-in on error
              }
            }
      
            return true; // Allow sign-in for other providers
          },
          
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
