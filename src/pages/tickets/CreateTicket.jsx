import HomeLayout from "../../layouts/HomeLayout";

function CreateTicket() {
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <form className="min-w-[40rem] border border-primary rounded-lg p-20 hover:bg-[#2b2a29] transition-all ease-in-out duration-300">
                    <h1 className="text-4xl font-bold text-center mb-8">Create a ticket</h1>

                    {/* label is taken from daisyui -> input */}
                    <label className="form-control w-full mb-4">
                        <div className="label">
                            <span className="label-text text-xl">What is title of the issue?</span>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered w-full text-lg font-bold bg-white text-black" 
                        />
                    </label>

                    {/* label is taken from daisyui -> input but textarea is customised by me */}
                    <label className="form-control w-full mb-8">
                        <div className="label">
                            <span className="label-text text-xl">Please describe your issue.</span>
                        </div>
                        <textarea
                            rows= "7"
                            cols= "1"
                            placeholder="Type here"
                            className="resize-none rounded-lg p-4 text-lg font-bold bg-white text-black"
                        >

                        </textarea>
                    </label>

                    <button className="btn btn-primary font-extrabold text-2xl w-full tracking-widest">
                        Submit
                    </button>

                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateTicket;