import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './features/transactionSlice';
import productReducer from './features/productSlice';

const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    product: productReducer,
  },
});

export default store;
