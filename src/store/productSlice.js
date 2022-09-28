const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
};

const initialState = Object.freeze({
  data: [],
  status: STATUSES.IDLE,
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //     setProducts(state, action) {
    //       state.data = action.payload;
    //     },
    //     setStatus(state, action) {
    //       state.status = action.payload;
    //     },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunk
// export const fetchProducts = () => {
//   return async function fetchProductsThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const res = await fetch("https://fakestoreapi.com/products");
//       const data = await res.json();
//       dispatch(setStatus(STATUSES.IDLE));
//       dispatch(setProducts(data));
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// };

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});
