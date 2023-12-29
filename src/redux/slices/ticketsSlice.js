import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axiosInstance } from "../../config/axiosInstance";



const initialState = {
    downloadedTickets: [],
    ticketList: [],
    ticketDistribution: {
        open: 0,
        inProgress: 0,
        resolved: 0,
        onHold: 0,
        cancelled: 0
    }
};

export const getTickets = createAsyncThunk("tickets/getTickets", async () => {
    const response = await axiosInstance.get("getMyAssignedTickets/", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    });
    return response.data.result;
});

const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        resetTicketsToEmpty: (state) => {
            state.downloadedTickets = [];
            state.ticketList = [];
            state.ticketDistribution = {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
        },
        filterTickets: (state, action) => {
            state.ticketList = state.downloadedTickets.filter((ticket) => ticket.status == action.payload);
        },
        resetTicketListToAllTickets : (state) => {
            state.ticketList= state.downloadedTickets;
        }

    },

    extraReducers: (builder) => builder
        .addCase(getTickets.fulfilled, (state, action) => {
            if (!action.payload) return;

            state.downloadedTickets = action.payload;
            state.ticketList = action.payload;

            state.ticketDistribution = {                        // everytime reset ticketDistribution state in case of logic called again
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
            state.ticketList.forEach((ticket) => {              // distribute tickets
                state.ticketDistribution[ticket.status]++;
            });
        })
        .addCase(getTickets.rejected, (state, action) => {
            console.log(action.error.message);
        })
});




export const { resetTicketListToAllTickets } = ticketsSlice.actions;
export const { resetTicketsToEmpty } = ticketsSlice.actions;
export const { filterTickets } = ticketsSlice.actions;
export default ticketsSlice;