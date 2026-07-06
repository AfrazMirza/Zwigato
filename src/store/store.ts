import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    shop: cartReducer,
    // Agar future me auth ka state rakhna ho toh authReducer yahan judega
  },
});

// TypeScript Configuration types definition matrix
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;