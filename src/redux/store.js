import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import ticketsSlice from "./slices/ticketsSlice";

const store= configureStore({
    reducer : {
        auth : authSlice.reducer,
        tickets : ticketsSlice.reducer,
    },
    devTools : true
});

export default store;