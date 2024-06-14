import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  try {
    const response = await axios.get(`https://test-fnr9.onrender.com/api/search`, {
      params: { query }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
}
