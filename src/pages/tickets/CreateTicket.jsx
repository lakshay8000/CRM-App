import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import HomeLayout from "../../layouts/HomeLayout";
import { createTicket } from "../../redux/slices/ticketsSlice";

function CreateTicket() {

    const authState= useSelector((state) => state.auth);
    const dispatch= useDispatch();

    // we will update the details of the ticket to be created in the below state and send this state object to backend for creating new ticket-
    const [ticket, setTicket] = useState({
        title : "",
        description : "",
        status : "open",
        ticketPriority : 4,
        clientName : authState.userData.clientName,
        assignedTo : "testengineer1@admin.com"
        // assignee and createdBy will be handled by backend. I have fixed assignedTo to testEngineer1 because of backend bug issue. Created only 1 engineer- testEngineer1, so randomly also all the tickets will be assigned to testEngineer1 only
    });

    function handleFormChange(e) {
        const {name, value} = e.target;
        setTicket({
            ...ticket,
            [name] : value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();     // default behaviour on submission of form is that the page refreshes

        if (ticket.title == "" || ticket.description == "") {
            toast.error("Title and description are mandatory");
            return;
        }
        else {
            await dispatch(createTicket(ticket));

            // reset ticket to initial state-
            setTicket({
                title : "",
                description : "",
                status : "open",
                ticketPriority : 4,
                clientName : authState.userData.clientName,
                assignedTo : "testengineer1@admin.com"
                // assignee and createdBy will be handled by backend. I have fixed assignedTo to testEngineer1 because of backend bug issue. Created only 1 engineer- testEngineer1, so randomly also all the tickets will be assigned to testEngineer1 only
            });
        }
    }


    return (
        <HomeLayout>
 
            <div className="min-h-[90vh] flex items-center justify-center">
                <form 
                    onSubmit={onFormSubmit}
                    className="min-w-[40rem] border border-primary rounded-lg p-20 hover:bg-[#2b2a29] transition-all ease-in-out duration-300"
                >
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
                            name= "title"
                            value= {ticket.title}
                            onChange={handleFormChange}
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
                            name= "description"
                            value= {ticket.description}
                            onChange={handleFormChange}
                        >

                        </textarea>
                    </label>

                    <button 
                        type="submit"
                        className="btn btn-primary font-extrabold text-2xl w-full tracking-widest"
                    >
                        Submit
                    </button>

                </form>
            </div>

        </HomeLayout>
    );
}

export default CreateTicket;