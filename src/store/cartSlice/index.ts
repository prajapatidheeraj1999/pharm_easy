import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}

interface CartState {
  items: CartItem[];
  token: string | null;
  userId: string | null;
}

const initialState: CartState = {
  items: [],
  token: null,
  userId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; 
        } else {
          state.items.push(action.payload);
        }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
        state.userId = action.payload;
      },
      reset:()=>{
        return initialState

      }
    
    
  },
});

export const { addItem, removeItem, setToken, setUserId,reset} = cartSlice.actions;

export default cartSlice.reducer;
