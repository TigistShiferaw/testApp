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

export const fetchRestaurants = createAsyncThunk<
  Restaurant[], // Return type
  string,       // Argument type
  { rejectValue: string } // Rejection type
>(
  'restaurants/fetchRestaurants',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/search', { params: { query } });
      return response.data;
    } catch (error) {
      // Check if the error is an AxiosError
      if (axios.isAxiosError(error)) {
        // Access the response data, if available
        return rejectWithValue(error.response?.data?.message || 'Error fetching restaurants');
      } else {
        // Fallback for non-Axios errors
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
      })
      .addCase(fetchRestaurants.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Ensure the payload is a string
      });
  },
});

export default restaurantsSlice.reducer;
