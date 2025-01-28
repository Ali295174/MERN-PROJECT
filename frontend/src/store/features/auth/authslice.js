 import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
 import authService from "./authService";



//  this login getting data from login and store it in inputvalues and send the data to auth service. 
 export const login = createAsyncThunk("auth/login",async(inputvalues,thunkAPI)=>{
    try {
        return await authService.loginUser(inputvalues);
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
  extraReducers : (situation)=>{
    situation.addCase(login.pending,(state)=>{
        state.status="loading";
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