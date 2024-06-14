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
  message: string | null;
}

const initialState: RestaurantsState = {
  restaurants: [],
  status: 'idle',
  error: null,
  message: null,
};

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/search', { params: { query } });
      // Check if a 'message' key exists in the response data
      if (response.data.message) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Error fetching restaurants');
      } else {
        return rejectWithValue('Error fetching restaurants');
      }
    }
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
        state.message = null; // Clear any previous messages
      })
      .addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
        state.message = null; // Clear any previous messages
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.message = action.payload as string; // Set the message if present
      });
  },
});

export default restaurantsSlice.reducer;
