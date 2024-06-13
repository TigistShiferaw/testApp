import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import searchRoutes from './routes/search';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/restaurantdb';

app.use(express.json());

app.use('/api', searchRoutes);

mongoose.connect(MONGODB_URL)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
