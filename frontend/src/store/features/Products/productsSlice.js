import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductsService from "../Products/productsService.js";

//-----------------------------------------------------AddProducts

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

  //-----------------------------------------------------getAllProducts
export const getAllProducts = createAsyncThunk(
  "Products/getAllProducts",
  async ( thunkAPI) => {
    try {
      const response =  await ProductsService.getAllProd();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//------------------------------------------------------deleteProduct

export const deleteProduct = createAsyncThunk(
  "Products/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const response =  await ProductsService.deleteProd (productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//-----------------------------------------------------updateProduct

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({productId,inputvalues} ,thunkAPI) => {
    try {
      const response =  await ProductsService.UpdateProducts(
        {productId,
        inputvalues});
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//-----------------------------------------------------getSingleProduct

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (productId, thunkAPI) => {
    try {
      const response =  await ProductsService.getSingleProd(productId);
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

   
  
    // --------------------------------------------other reducers...
  //-----------------------------------------------------addProduct
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
        //-----------------------------------------------------getAllProducts

      . addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "success";
        // Assuming the response contains the new category data
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //-----------------------------------------------------deleteProduct
      . addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "success";
        // Assuming the response contains the new category data
        state.products = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //------------------------------------------------------updateProduct
      
      . addCase(updateProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "success";
        // Assuming the response contains the new category data
        state.products = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      . addCase(getSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = "success";
        // Assuming the response contains the new category data
        state.products = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

    },
  });
  
  // Action creators are generated for each case reducer function
  // export const { incrementByAmount } = authslice.actions;
  
  export default productSlice.reducer;
  
  
