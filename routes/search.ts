import express, { Request, Response } from 'express';
import { fuzzySearchRestaurants } from '../controllers/search';

const router = express.Router();

router.get('/search', async (req: Request, res: Response) => {
  const query = req.query.query as string;
  try {
    const results = await fuzzySearchRestaurants(query);
    res.json({results});
  } catch (error) {
    res.status(500).json('Internal Error' );
  }
});

export default router;
