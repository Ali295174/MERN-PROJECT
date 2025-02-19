import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductsService from "../Products/ProductsService.js";

//-----------------------------------------------------AddCategory

export const addProduct = createAsyncThunk(
    "products/AddProduct",
    async (inputvalues, thunkAPI) => {
      try {
        const response =  await ProductsService.createProducts(inputvalues);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const productSlice = createSlice({
    name: "storeProducts",
    initialState: {
      products: [],
      status: "idle",
      error: null,
    },
  
    reducers: { },

   
  
    // ---------------------------------other reducers...
  
    extraReducers: (situation) => {
      situation
      . addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "success";
        // Assuming the response contains the new category data
        state.products = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

    },
  });
  
  // Action creators are generated for each case reducer function
  // export const { incrementByAmount } = authslice.actions;
  
  export default productSlice.reducer;
  
  
