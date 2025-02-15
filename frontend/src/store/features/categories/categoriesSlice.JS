import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesService from "../categories/categoriesService";

//-----------------------------------------------------getAllCategory
export const getAllCategory = createAsyncThunk(
  "categories/getAllCategory",
  async ( thunkAPI) => {
    try {
      const response =  await categoriesService.getAllCat();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//-----------------------------------------------------getSingleCategory
export const getSingleCategory = createAsyncThunk(
  "categories/getSingleCategory",
  async ( slug,thunkAPI) => {
    try {
      const response =  await categoriesService.getSingleCat(slug);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


//-----------------------------------------------------AddCategory

export const AddCategory = createAsyncThunk(
  "categories/AddCategory",
  async (inputvalues, thunkAPI) => {
    try {
      const response =  await categoriesService.createCat(inputvalues);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//------------------------------------------------------deletecategory

export const deletecategory = createAsyncThunk(
  "categories/deletecategory",
  async (slug, thunkAPI) => {
    try {
      const response =  await categoriesService.deleteAllCat(slug);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);





export const categoriesSlice = createSlice({
  name: "categorySlice",
  initialState: {
    initialCategory: [],
    status: "ideal",
    error: null,
  },

  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  // ---------------------------------other reducers...

  extraReducers: (situation) => {
    situation. addCase(AddCategory.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(AddCategory.fulfilled, (state, action) => {
      state.status = "success";
      // Assuming the response contains the new category data
      state.storeCategory = action.payload;
    })
    .addCase(AddCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    


    //------------------------------------------------------- Handling getAllCategory actions
    .addCase(getAllCategory.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(getAllCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.initialCategory = action.payload; // Assuming the response contains the list of categories
    })
    .addCase(getAllCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })


    // --------------------------------------------------------Handling getSingleCategory actions
    .addCase(getSingleCategory.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(getSingleCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.initialCategory = action.payload; // Assuming the response contains the list of categories
    })
    .addCase(getSingleCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })


   // --------------------------------------------------------Handling deleteallCategory actions
    .addCase(deletecategory.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(deletecategory.fulfilled, (state, action) => {
      state.status = "success";
      state.initialCategory = action.payload; // Assuming the response contains the list of categories
    })
    .addCase(deletecategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { incrementByAmount } = authslice.actions;

export default categoriesSlice.reducer;
