import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets, getTickets, resetTicketListToAllTickets } from "../redux/slices/ticketsSlice";



function useTickets() {
    const authState = useSelector(state => state.auth);
    const ticketsState= useSelector(state => state.tickets);
    const dispatch= useDispatch();

    const [searchParams] = useSearchParams();

    // for getting and setting tickets assigned to the engineer in tickets state-
    async function loadTickets() {
        if (authState.userData.userType == "engineer") {
            await dispatch(getTickets());
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
    }, [authState.token, searchParams.get("category")]);     // make changes to ticketState.ticketList only if user changes or category of ticket changes (for example category changes in dashboard)

    return [ticketsState];

}

export default useTickets;