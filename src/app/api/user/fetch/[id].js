// /app/api/user/fetch/[id].js

import db from '@/../util/db'; // Import your database utility

export default async function handler(req, res) {
  const userId = req.query.id.toString(); // Extract user ID from request parameters

  try {
    // Fetch user data based on the provided user ID
    const userInfo = await db('User').where({ id: userId }).select('firstName', 'lastName', 'birthdate').first();
    
    if (!userInfo) {
      // If user is not found, return a 404 Not Found error
      return res.status(404).json({ error: 'User not found' });
    }

    // If user is found, return the user data in the response
    res.status(200).json(userInfo);
  } catch (error) {
    // If there's an error fetching user data, return a 500 Internal Server Error
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
