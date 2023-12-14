import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../redux/slices/authSlice";

function Login() {
    const [formDetails, setFormDetails] = useState({
        email : "",
        password : "" 
    });

    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormDetails({
            ...formDetails,
            [name] : value
        });
    }

    const dispatch= useDispatch();
    function onSubmit() {
        dispatch(login(formDetails));
    }

    return (
        <div className="login-form-wrapper flex justify-center items-center h-[90vh]">  {/* 90vh means 90% of viewport height */}
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body items-center">
                    <h2 className="card-title font-bold text-3xl text-center">Login</h2>
                    
                    <input 
                        name= "email"
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="email" 
                        className="input input-bordered w-full max-w-xs mt-4 text-white" 
                    />

                    <input 
                        name= "password"
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="Password" 
                        className="input input-bordered w-full max-w-xs mb-4 text-white" 
                    />

                    <div className="card-actions justify-end w-full">
                        <button 
                            className="btn w-full"
                            onClick={onSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;