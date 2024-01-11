import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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

export const updateTicket = createAsyncThunk("tickets/updateTickets", async (updatedTicketDetails) => {
    try {
        // api call to backend for updating the ticket-
        const response = axiosInstance.patch(`ticket/${updatedTicketDetails._id}`,
            updatedTicketDetails,  // (req body)
            {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }
        );

        toast.promise(response, {
            success: 'Successfully updated the ticket',
            loading: 'Updating the ticket',
            error: 'Something went wrong'
        });
        return (await response)?.data?.result;     // note the way how we use await here
    }
    catch (error) {
        console.log(error);
    }

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
        resetTicketListToAllTickets: (state) => {
            state.ticketList = state.downloadedTickets;
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
            state.downloadedTickets.forEach((ticket) => {       // distribute tickets
                state.ticketDistribution[ticket.status]++;
            });
        })
        .addCase(getTickets.rejected, (state, action) => {
            console.log(action.error.message);
        })
        .addCase(updateTicket.fulfilled, (state, action) => {
            // console.log(action.payload);
            
            const updatedTicket= action.payload;

            // update downloadedTickets in state-
            state.downloadedTickets = state.downloadedTickets.map((ticket) => {
                if (ticket._id == updatedTicket._id) {
                    return updatedTicket;
                }
                else return ticket;
            });

            // update ticketList in state-
            state.ticketList= state.ticketList.map((ticket) => {
                if (ticket._id == updatedTicket._id) {
                    return updatedTicket;
                }
                else return ticket;
            });

            // update ticketDistribution in state-
            state.ticketDistribution = {                        // everytime reset ticketDistribution state in case of logic called again
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
            state.downloadedTickets.forEach((ticket) => {       // distribute tickets
                state.ticketDistribution[ticket.status]++;
            });
        })
});




export const { resetTicketListToAllTickets } = ticketsSlice.actions;
export const { resetTicketsToEmpty } = ticketsSlice.actions;
export const { filterTickets } = ticketsSlice.actions;
export default ticketsSlice;