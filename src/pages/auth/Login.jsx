import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../redux/slices/authSlice";

function Login() {
    const navigate = useNavigate();

    const [formDetails, setFormDetails] = useState({
        email: "",
        password: ""
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormDetails({
            ...formDetails,
            [name]: value
        });
    }

    function resetFormDetails() {
        setFormDetails({
            email: "",
            password: ""
        });
    }

    const dispatch = useDispatch();
    async function onSubmit() {
        const response = await dispatch(login(formDetails));  // it will return the thunk promise as response
        if (response.payload) navigate("/");                  // in case of successful login
        else resetFormDetails();                              // in case of unsuccessful login
    }

    return (
        <div className="login-form-wrapper flex justify-center items-center h-[90vh]">  {/* 90vh means 90% of viewport height */}
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body items-center">
                    <h2 className="card-title font-bold text-3xl text-center">Login</h2>

                    <input
                        name="email"
                        onChange={handleInputChange}
                        type="text"
                        placeholder="email"
                        value={formDetails.email}
                        className="input input-bordered w-full max-w-xs mt-4 text-white"
                    />

                    <input
                        name="password"
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Password"
                        value={formDetails.password}
                        className="input input-bordered w-full max-w-xs mb-4 text-white"
                    />

                    <div className="card-actions justify-end w-full">
                        <button
                            className="btn w-full hover:bg-transparent hover:text-black transition-all ease-in-out delay-100 duration-300 "
                            onClick={onSubmit}
                        >
                            Submit
                        </button>
                    </div>

                    <Link 
                        to={"/signup"} 
                        className="mt-2 text-lg font-semibold text-decoration-line: underline hover:text-zinc-100"
                    > 
                        Dont have an account? Signup instead! 
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Login;