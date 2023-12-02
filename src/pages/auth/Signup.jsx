function Signup() {
    return (
        <div className="signup-form-wrapper flex justify-center items-center h-[90vh]">  {/* 90vh means 90% of viewport height */}
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body items-center">
                    <h2 className="card-title font-bold text-3xl text-center">Sign up</h2>

                    <input
                        type="text"
                        placeholder="Username"
                        className="input input-bordered w-full max-w-xs mt-4 text-white"
                    />

                    <input
                        type="text"
                        placeholder="Email"
                        className="input input-bordered w-full max-w-xs text-white"
                    />

                    <input
                        type="text"
                        placeholder="Password"
                        className="input input-bordered w-full max-w-xs text-white"
                    />

                    <div className="dropdown dropdown-right text-white flex me-auto mb-4">
                        <div tabIndex={0} role="button" className="btn m-1">User Type</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Customer</a></li>
                            <li><a>Engineer</a></li>
                        </ul>
                    </div>

                    <div className="card-actions justify-end w-full">
                        <button className="btn w-full">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;