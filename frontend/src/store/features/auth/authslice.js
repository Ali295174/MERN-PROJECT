 import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
 import authService from "./authService";

 
 export const register = createAsyncThunk("auth/register",async(inputvalues,thunkAPI)=>{
    try {
      const response =  await authService.registerUser(inputvalues);
      return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
 });


//  this login getting data from login and store it in inputvalues and send the data to auth service. 
 export const login = createAsyncThunk("auth/login",async(inputvalues,thunkAPI)=>{
    try {
      const response =  await authService.loginUser(inputvalues);
      window.localStorage.setItem("user",JSON.stringify(response)); // storing user data in local storage.
      return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
 });

 export const logout = createAsyncThunk("auth/logout",async(thunkAPI)=>{
    try {
      const response =  await authService.logoutUser();
      window.localStorage.removeItem("user"); // storing user data in local storage.
      return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
 });





 const getUserDatafromLocalstorage = window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")) : null;

export const authslice = createSlice({
  name: 'auth',
  initialState:{
    user : getUserDatafromLocalstorage,
    status: "ideal",
    error : null
  },

  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  // ---------------------------------other reducers...
  extraReducers : (situation)=>{
    situation.addCase(register.pending,(state)=>{
        state.status="loading";
        state.error = null;
    })
    // action.payload is where our data is stored
    situation.addCase(register.fulfilled,(state,action)=>{
        state.status="success";
        state.user= action.payload;
    })
    situation.addCase(register.rejected,(state,action)=>{
        state.status="failed";
        state.error= action.payload;
    })
    situation.addCase(logout.pending,(state)=>{
        state.status="loading";
        state.error= null;
    })
    // action.payload is where our data is stored
    situation.addCase(logout.fulfilled,(state)=>{
        state.status="success";
        state.user= null;
    })
    situation.addCase(logout.rejected,(state,action)=>{
        state.status="failed";
        state.error= action.payload;
    })
    situation.addCase(login.pending,(state)=>{
        state.status="loading";
         state.error = null;
    })
    // action.payload is where our data is stored
    situation.addCase(login.fulfilled,(state,action)=>{
        state.status="success";
        state.user= action.payload;
    })
    situation.addCase(login.rejected,(state,action)=>{
        state.status="failed";
        state.error= action.payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { incrementByAmount } = authslice.actions

export default authslice.reducer