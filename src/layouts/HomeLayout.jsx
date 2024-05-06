import "./homeLayout.css";

import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../redux/slices/authSlice";
import { resetTicketsToEmpty } from "../redux/slices/ticketsSlice";


function HomeLayout({ children }) {
    const authState= useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
        dispatch(resetTicketsToEmpty());
        navigate("/login");
    }

   
    return (
        <div className="min-h-[90vh] flex flex-row mt-4">

            <div className="drawer basis-1/12 ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content">
                    <label
                        htmlFor="my-drawer"
                        className="btn btn-primary px-2 drawer-button"
                    >
                        <BsFillMenuButtonWideFill size={"28px"} />
                    </label>
                </div>
                
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li onClick={() => navigate("/")} ><a>Home</a></li>
                        <li onClick={() => navigate("/dashboard")} ><a>Dashboard</a></li>
                        
                        {
                            authState?.isLoggedIn == true
                            &&
                            <li onClick={() => navigate("/ticket/create")} ><a>Raise a ticket</a></li>
                        }

                        {
                            authState?.userData?.userType == "admin"
                            &&
                            <li onClick={() => navigate("/users")} ><a>Users info</a></li>
                        }

                        <div className="w-1/2 gap-12 absolute bottom-8 flex justify-between ">
                            <button className=" px-4 py-1 " onClick={handleLogout} > Logout </button>
                            <button className=" px-4 py-1 "> Profile </button>
                        </div>

                    </ul>
                </div>

            </div>

            <div className="main-body basis-11/12 flex flex-row grow justify-center items-start px-4">
                {children}
            </div>

        </div>
    );
}

export default HomeLayout;