import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    role : localStorage.getItem("role") || "",
    data : localStorage.getItem("data") || {},
    isLoggedIn : localStorage.getItem("isLoggedIn") || false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      /*
      format exmaple of reducers-

      increment(state) {
        state.value++
      },
      decrement(state) {
        state.value--
      },
      incrementByAmount(state, action) {
        state.value += action.payload
      },

      */
    },
});

export default authSlice;