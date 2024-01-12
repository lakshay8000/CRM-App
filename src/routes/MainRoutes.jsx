import { Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Homepage from "../pages/Homepage/Homepage";
import CreateTicket from "../pages/tickets/Createticket";
import ListAllUsers from "../pages/users/ListAllUsers";
import AuthRoutes from "./AuthRoutes";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route element= {<AuthRoutes allowedRoles={["admin"]} />} >
                <Route path= "/users" element= {<ListAllUsers />} />
            </Route>
            <Route path="/ticket/create" element= {<CreateTicket />} />
        </Routes>
    );
}

export default MainRoutes;