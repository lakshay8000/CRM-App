import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets, getAllTicketsForAdmin, getTickets, getTicketsForCustomer, resetTicketListToAllTickets } from "../redux/slices/ticketsSlice";



function useTickets() {
    const authState = useSelector(state => state.auth);
    const ticketsState = useSelector(state => state.tickets);
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();

    // for getting and setting tickets in tickets state-
    async function loadTickets() {
        if (authState.userData.userType == "customer") {
            await dispatch(getTicketsForCustomer());     // this will load tickets created by the customer
        }
        else if (authState.userData.userType == "engineer") {
            await dispatch(getTickets());
        }
        else if (authState.userData.userType == "admin") {
            await dispatch(getAllTicketsForAdmin());
        }

        if (searchParams.get("category")) {
            // dispatch a filter action-
            dispatch(filterTickets(searchParams.get("category")));
        }
        else {
            dispatch(resetTicketListToAllTickets());
        }
    }

    useEffect(() => {
        loadTickets();
    }, []);

    return [ticketsState];

}

export default useTickets;