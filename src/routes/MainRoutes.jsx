import { Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Homepage from "../pages/Homepage/Homepage";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default MainRoutes;