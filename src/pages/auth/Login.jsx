function Login() {
    return (
        <div className="login-form-wrapper flex justify-center items-center h-[90vh]">  {/* 90vh means 90% of viewport height */}
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body items-center">
                    <h2 className="card-title font-bold text-3xl text-center">Login</h2>
                    
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="input input-bordered w-full max-w-xs mt-4 text-white" 
                    />

                    <input 
                        type="text" 
                        placeholder="Password" 
                        className="input input-bordered w-full max-w-xs mb-4 text-white" 
                    />

                    <div className="card-actions justify-end w-full">
                        <button className="btn w-full">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;