import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axios.get('http://localhost:3000/productos');
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'Cargando';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'Cargados';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'Falla';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
