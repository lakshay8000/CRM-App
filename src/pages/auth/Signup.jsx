import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { axiosInstance } from "../../config/axiosInstance";


function Signup() {
    const navigate= useNavigate();

    const [signupDetails, setSignupDetails] = useState({
        name: "",
        email: "",
        password: "",
        clientName: "",
        userType: "",
        userStatus: ""
    });

    function handleUserType(e) {
        const userTypeSelected = e.target.textContent;
        setSignupDetails({
            ...signupDetails,
            userType: userTypeSelected,
            userStatus: (userTypeSelected == "customer") ? "approved" : "suspended"
        });
    }

    function resetSignupDetails() {
        setSignupDetails({
            name: "",
            email: "",
            password: "",
            clientName: "",
            userType: "",
            userStatus: ""
        });
    }

    async function onSignupSubmit() {
        try {
            const response= axiosInstance.post("/auth/signup", signupDetails);
            
            toast.promise(response, {
                loading: 'Loading',
                success: 'Signed up successfully',
                error: 'Something went wrong, please try again',
            });
            await response;      // awaiting response like this because of promise toast
            
            navigate("/login");   
        }
        catch (error) {
            console.log(error);
            resetSignupDetails();
        }
    }


    return (
        <div className="signup-form-wrapper flex justify-center items-center h-[90vh]">  {/* 90vh means 90% of viewport height */}
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body items-center">
                    <h2 className="card-title font-bold text-3xl text-center">Sign up</h2>

                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setSignupDetails({ ...signupDetails, name: e.target.value })}
                        value={signupDetails.name}
                        className="input input-bordered w-full max-w-xs mt-4 text-white"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setSignupDetails({ ...signupDetails, email: e.target.value })}
                        value={signupDetails.email}
                        className="input input-bordered w-full max-w-xs text-white"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setSignupDetails({ ...signupDetails, password: e.target.value })}
                        value={signupDetails.password}
                        className="input input-bordered w-full max-w-xs text-white"
                    />

                    <input
                        type="text"
                        placeholder="Client Name"
                        onChange={(e) => setSignupDetails({ ...signupDetails, clientName: e.target.value })}
                        value={signupDetails.clientName}
                        className="input input-bordered w-full max-w-xs text-white"
                    />

                    <div
                        className="dropdown dropdown-right text-white flex me-auto mb-4"
                    >
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn m-1"
                        >
                            {signupDetails.userType ? signupDetails.userType : "User Type"}
                        </div>
                        <ul
                            tabIndex={0}
                            onClick={handleUserType}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li><a>customer</a></li>
                            <li><a>engineer</a></li>
                            <li><a>admin</a></li>
                        </ul>
                    </div>

                    <div className="card-actions justify-end w-full">
                        <button
                            className="btn w-full hover:bg-transparent hover:text-black transition-all ease-in-out delay-100 duration-300 "
                            onClick={onSignupSubmit}
                        >
                            Submit
                        </button>
                    </div>

                    <Link 
                        to={"/login"} 
                        className="mt-2 text-lg font-semibold text-decoration-line: underline hover:text-zinc-100" 
                    > 
                        Already have an account? Login instead! 
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Signup;