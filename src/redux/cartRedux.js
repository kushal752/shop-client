import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: false,
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.prodprice * action.payload.quantity;
      // console.log("abc", action.payload);
      state.loading = false;
      state.error = false;
    },

    loadingStart: (state, action) => {
      state.loading = true;
    },
    errorStart: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    InitCart: (state, action) => {
      console.log("reducer",action.payload);
      state.products = action.payload.productarray;
      state.quantity = action.payload.q;
      state.total = action.payload.total;
      state.loading = false;
      state.error = false;
    },
    CartLogout: (state,action) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
      state.loading = false;
      state.error = false;
    },
    deleteItemCart: (state, action) => {
      console.log("reducer",action.payload);

      state.products = action.payload.productarray;
      state.quantity = action.payload.q;
      state.total = action.payload.total;
      state.loading = false;
      state.error = false;
    }
  },
});

export const { addProduct, loadingStart, errorStart, InitCart, CartLogout, deleteItemCart } = cartSlice.actions;
export default cartSlice.reducer;