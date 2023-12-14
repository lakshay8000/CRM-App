import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { axiosInstance } from '../../config/axiosInstance';


const initialState= {
    // if data is present inside localStorage, we will fetch it from there otherwise it will be undefined
    userData : JSON.parse(localStorage.getItem("userData")) || undefined,
    isLoggedIn : localStorage.getItem("isLoggedIn") || false,
    token : localStorage.getItem("token") || undefined
};

export const login= createAsyncThunk("auth/login", async (data) => {
    const response= await axiosInstance.post("/auth/signin", data);    // data is the formDetails that we are passing while calling dispatch(login(formDetails)) in login.jsx
    return response.data;                                              // this will be action.payload in case of thunk
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      
    },
    extraReducers : (builder) => {
      builder
      .addCase(login.fulfilled, (state, action) => {
        state.userData= action.payload;
        state.isLoggedIn= action.payload.token != undefined;
        state.token= action.payload?.token;

        // set data in localStorage so that we don't have to fetch it again via login api call
        localStorage.setItem("userData", JSON.stringify(action.payload) );
        localStorage.setItem("isLoggedIn", action.payload.token != undefined);  
        localStorage.setItem("token", action.payload?.token);          // this syntax means that if action.payload is present then we will move forward and fetch token otherwise we will return undefined. Its a js feature which is a shorthand for skipping the if statement
      });
    }
});

export default authSlice;