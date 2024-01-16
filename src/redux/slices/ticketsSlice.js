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
    return response?.data?.result;
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

export const createTicket= createAsyncThunk("tickets/createTicket", async (ticket) => {
    try {
        const response= axiosInstance.post("ticket", 
        ticket,   // new ticket which we created passed as req body  
        {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            }
        });
    
        toast.promise(response, {
            success : "Successfully created ticket",
            loading : "Creating new ticket",
            error : "Somthing went wrong"
        });
    
        return (await response)?.data;
    }
    catch (error) {
        console.log(error);
    }
});

export const getTicketsForCustomer= createAsyncThunk("tickets/getTicketsForCustomer", async () => {
    try {
        const response= await axiosInstance.get("getMyCreatedTickets", {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            }
        });
        return response?.data?.result;
    }
    catch (error) {
        console.log(error);
    }
});

export const getAllTicketsForAdmin= createAsyncThunk("tickets/getAllTicketsForAdmin", async () => {
    const response= await axiosInstance("ticket", {
        headers : {
            "x-access-token" : localStorage.getItem("token")
        }
    });
    return response?.data?.result;
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
            console.log(action.payload);

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
            if (!action.payload) return;
            
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
        
        .addCase(createTicket.fulfilled, (state, action) => {
            if (!action.payload) return;
        
            const newTicket= action.payload;
            // console.log(newTicket);

            // update downloadedTickets, ticketList and ticketDistribution state-
            state.downloadedTickets.push(newTicket);
            state.ticketList= state.downloadedTickets;
            state.ticketDistribution.open ++ ;
        })

        .addCase(getTicketsForCustomer.fulfilled, (state, action) => {
            if (!action.payload) return;
            console.log(action.payload);

            // update downloadedTickets, ticketList and ticketDistribution state-
            state.downloadedTickets= action.payload;
            state.ticketList= action.payload;
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

        .addCase(getAllTicketsForAdmin.fulfilled, (state, action) => {
            if (!action.payload) return;

            // update downloadedTickets, ticketList and ticketDistribution state-
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
});




export const { resetTicketListToAllTickets } = ticketsSlice.actions;
export const { resetTicketsToEmpty } = ticketsSlice.actions;
export const { filterTickets } = ticketsSlice.actions;
export default ticketsSlice;