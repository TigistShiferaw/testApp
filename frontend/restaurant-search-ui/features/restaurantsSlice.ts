import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  address: {
    building: string;
    street: string;
  };
  grades: {
    date: string;
    grade: string;
    score: number;
  }[];
}

export interface RestaurantsState {
  restaurants: Restaurant[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RestaurantsState = {
  restaurants: [],
  status: 'idle',
  error: null
};

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (query: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search`, { params: { query } });
    return response.data;
  }
);

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default restaurantsSlice.reducer;
