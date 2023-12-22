import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTickets } from "../redux/slices/ticketsSlice";



function useTickets() {
    const authState = useSelector(state => state.auth);
    const ticketsState= useSelector(state => state.tickets);
    const dispatch= useDispatch();

    // for getting and setting tickets assigned to the engineer in tickets state-
    useEffect(() => {
        if (authState.userData.userType == "engineer") {
            dispatch(getTickets());
        }
    }, []);

    return [ticketsState];

}

export default useTickets;