// /app/api/user/fetch/[id].js

import db from '@/../util/db';

export default async function handler(req, res) {
  const userId = req.query.id.toString();

  try {
    const userInfo = await db('User').where({ id: userId }).select('firstName', 'lastName', 'birthdate').first();
    
    if (!userInfo) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
