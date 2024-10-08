import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const processTransaction = createAsyncThunk('transaction/processTransaction', async (transactionData) => {
  const response = await axios.post('https://s6mggfxu5l.execute-api.us-east-2.amazonaws.com/default/BackendTransaction', transactionData);
  return response.data;
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    status: 'idle',
    error: null,
    transactionResult: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(processTransaction.pending, (state) => {
        state.status = 'Cargando';
      })
      .addCase(processTransaction.fulfilled, (state, action) => {
        state.status = 'Aprobada';
        state.transactionResult = action.payload;
      })
      .addCase(processTransaction.rejected, (state, action) => {
        state.status = 'Falla';
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
