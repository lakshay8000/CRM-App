import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axiosInstance } from "../../config/axiosInstance";



const initialState= {
    ticketList : [],
};

export const getTickets= createAsyncThunk("tickets/getTickets", async () => {
    const response= await axiosInstance.get("getMyAssignedTickets/", {
                        headers : {
                            "x-access-token": localStorage.getItem("token")
                        }
                    });
    return response.data.result;
});

const ticketsSlice= createSlice({
    name : "tickets",
    initialState,
    reducers : {
        
    },

    extraReducers : (builder) => builder
    .addCase(getTickets.fulfilled, (state, action) => {
        state.ticketList= action.payload;
    })
    .addCase(getTickets.rejected, (state, action) => {
        console.log(action.error.message);
    })
});



export default ticketsSlice;