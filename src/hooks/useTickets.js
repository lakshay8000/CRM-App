import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets, getAllTicketsForAdmin, getTickets, getTicketsForCustomer, resetTicketListToAllTickets } from "../redux/slices/ticketsSlice";


function useTickets() {
    const authState = useSelector(state => state.auth);
    const ticketsState = useSelector(state => state.tickets);
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    // for getting and setting tickets in tickets state-
    async function loadTickets() {
        if (authState?.userData?.userType == "customer") {
            setIsLoading(true);
            await dispatch(getTicketsForCustomer());     // this will load tickets created by the customer
            setIsLoading(false);
        }
        else if (authState.userData.userType == "engineer") {
            setIsLoading(true);
            await dispatch(getTickets());
            setIsLoading(false);
        }
        else if (authState.userData.userType == "admin") {
            setIsLoading(true);
            await dispatch(getAllTicketsForAdmin());
            setIsLoading(false);
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

    return [ticketsState, isLoading];

}

export default useTickets;