import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function HomeLayout({ children }) {

    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    function handleLogout() {
        navigate("/login");
        localStorage.clear();
    }

    return (
        <div className="min-h-[90vh] flex flex-row">

            <div className="drawer w-1/3">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mt-2 ">
                    {/* Page content here */}
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
                        <li><a>View all tickets</a></li>
                        <li onClick={handleLogout} ><a>Dashboard</a></li>

                        <div className="w-1/2 gap-12 absolute bottom-8 flex justify-between ">
                            <button className=" px-4 py-1 "> Logout </button>
                            <button className=" px-4 py-1 "> Profile </button>
                        </div>
                    </ul>
                </div>
            </div>


            <div className="main-body w-full ">
                {children}
            </div>

        </div>
    );
}

export default HomeLayout;