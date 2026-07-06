import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
  discountPercentage?: number;
  brand?: string;
}

interface CartState {
  cart: CartItem[];
  favorites: any[];
  selectedIds: number[];
}

const initialState: CartState = {
  cart: [],
  favorites: [],
  selectedIds: [],
};

const cartSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const itemExists = state.cart.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.selectedIds = state.selectedIds.filter((id) => id !== action.payload);
    },
    toggleSelection: (state, action: PayloadAction<number>) => {
      if (state.selectedIds.includes(action.payload)) {
        state.selectedIds = state.selectedIds.filter((id) => id !== action.payload);
      } else {
        state.selectedIds.push(action.payload);
      }
    },
    toggleAll: (state) => {
      if (state.selectedIds.length === state.cart.length) {
        state.selectedIds = [];
      } else {
        state.selectedIds = state.cart.map((item) => item.id);
      }
    },
    toggleFavorite: (state, action: PayloadAction<any>) => {
      const exists = state.favorites.find((item) => item.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter((item) => item.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
    },
    clearOrderedItems: (state, action: { payload: number[] }) => {
  // Payload me hum un items ki ids bhejenge jo successfully buy ho chuke hain
  const orderedIds = action.payload;
  
  // 1. Cart me se un items ko hata do jo orderedIds me hain
  state.cart = state.cart.filter(item => !orderedIds.includes(item.id));
  
  // 2. Selected IDs me se bhi unhe clear kar do taaki selection bar reset ho jaye
  state.selectedIds = state.selectedIds.filter(id => !orderedIds.includes(id));
},
  },
});

export const { addToCart, removeFromCart, toggleSelection, toggleAll, toggleFavorite, clearOrderedItems } = cartSlice.actions;
export default cartSlice.reducer;