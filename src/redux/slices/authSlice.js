import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { axiosInstance } from '../../config/axiosInstance';


const initialState = {
  // if data is present inside localStorage, we will fetch it from there otherwise it will be undefined
  userData: JSON.parse(localStorage.getItem("userData")) || undefined,          // JSON.parse() will convert string back to object
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || false),          // JSON.parse() will convert string back to boolean
  token: localStorage.getItem("token") || undefined
};


export const login = createAsyncThunk("auth/login", async (data) => {
  // we will not use try and catch here as thunks automatically handles fulfilled, rejected and pending actions that we describe in extraReducers

  const response = axiosInstance.post("auth/signin", data);   // data is the formDetails that we are passing while calling dispatch(login(formDetails)) in login.jsx
  
  toast.promise(response, {
    loading: 'Loading',
    success: 'Signed in successfully',
    error: 'Something went wrong, please try again',
  });
  
  const result= await response;
  return result.data;            // this will be action.payload in case of thunk

});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.userData= undefined;
      state.isLoggedIn= false;
      state.token= undefined; 
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {

        // update state-
        state.userData = action.payload.userData;
        state.isLoggedIn = action.payload.token != undefined;
        state.token = action.payload?.token;

        // set data in localStorage so that we don't have to fetch it again via login api call
        localStorage.setItem("userData", JSON.stringify(action.payload.userData));
        localStorage.setItem("isLoggedIn", action.payload.token != undefined);
        localStorage.setItem("token", action.payload?.token);          // this syntax means that if action.payload is present then we will move forward and fetch token otherwise we will return undefined. Its a js feature (optional chaining) which is a shorthand for skipping the if statement

      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.error.message);
      });
  }
});


export const {logout} = authSlice.actions;
export default authSlice;