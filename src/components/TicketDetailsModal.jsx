import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets, updateTicket } from "../redux/slices/ticketsSlice";

function TicketDetailsModal({selectedTicket, setSelectedTicket}) {
    const dispatch= useDispatch();
    const [searchParams] = useSearchParams();

    // this fn will just change the details in selectedTicket state
    function handleTicketUpdate(e) {
        const dropdownName= e.target.name;
        setSelectedTicket({
            ...selectedTicket,
            [dropdownName] : e.target.value
        });
    }

    async function handleFormSubmit() {
        await dispatch(updateTicket(selectedTicket));
        
        // If the category/status of the ticket has changed during updation, we will filter it so that it doesn't show on the current page
        if (searchParams.get("category")) {
            // dispatch a filter action-
            dispatch(filterTickets(searchParams.get("category")));
        }

        // after updating the ticket, we will close the popped up modal now-
        document.getElementById("ticket-details-modal").close();
    }

    return (
        // Ticket details diasyui popup modal
        <dialog id="ticket-details-modal" className="modal">
            <div className="modal-box">
                
                <h1 className="font-bold text-3xl">{selectedTicket.title}</h1>

                {/* use textarea tag for description */}
                <textarea
                    name="description"
                    className="w-full mt-4 rounded-md p-2 resize-none"
                    rows={10}
                    cols={20}
                    value={selectedTicket.description}
                    onChange={handleTicketUpdate}
                >
                    
                </textarea>

                {/* Used select and option tags manually to create dropdown */}
                <h3>
                    <label htmlFor="ticket-priority">Priority :</label>
                    <select 
                        name= "ticketPriority"
                        id="ticket-priority"
                        onChange={handleTicketUpdate} 
                        value={selectedTicket.ticketPriority}  
                        className="ml-2 rounded-md px-2 py-1 mt-4"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </h3>

                {/* Used select and option tags manually to create dropdown */}
                <h3>
                    <label htmlFor="ticket-status">Status :</label>
                    <select 
                        name= "status"
                        id="ticket-status"
                        onChange={handleTicketUpdate}
                        value={selectedTicket.status}  
                        className="ml-2 rounded-md px-2 py-1 mt-4"
                    >
                        <option value="open">open</option>
                        <option value="inProgress">inProgress</option>
                        <option value="resolved">resolved</option>
                        <option value="onHold">onHold</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </h3>

                {/* Taken from another daisyui modal which was having colse button */}
                <div className="modal-action">
                    <button onClick={handleFormSubmit} className="btn btn-primary font-bold">
                        Update Ticket
                    </button>
                </div>

            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default TicketDetailsModal;