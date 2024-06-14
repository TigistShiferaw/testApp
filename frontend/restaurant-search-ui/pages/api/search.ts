import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ message: 'Query parameter is required and must be a string' });
  }

  try {
    const response = await axios.get('https://test-fnr9.onrender.com/api/search', {
      params: { query }
    });

    // Check if data is empty and send an appropriate response
    if (response.data.length === 0) {
      res.status(200).json({ message: 'No restaurants found' });
    } else {
      res.status(200).json(response.data);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      res.status(500).json({ message: error.response?.data?.message || 'Error fetching restaurants' });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'Unexpected error fetching restaurants' });
    }
  }
}
