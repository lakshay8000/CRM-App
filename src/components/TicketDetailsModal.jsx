function TicketDetailsModal({selectedTicket}) {
    return (
        // Ticket details diasyui popup modal
        <dialog id="ticket-details-modal" className="modal">
            <div className="modal-box">
                
                <h1 className="font-bold text-3xl">{selectedTicket.title}</h1>

                {/* use textarea tag for description */}
                <textarea
                    name="description"
                    className="w-full mt-4 rounded-md p-2"
                    rows={10}
                    cols={20}
                    value={selectedTicket.description}
                >
                    
                </textarea>

                {/* Used select and option tags manually to create dropdown */}
                <h3>
                    <label htmlFor="ticket-priority">Priority :</label>
                    <select id="ticket-priority" className="ml-2 rounded-md px-2 py-1 mt-4">
                        <option value="1" selected= {selectedTicket.ticketPriority == 1}>1</option>
                        <option value="2" selected= {selectedTicket.ticketPriority == 2}>2</option>
                        <option value="3" selected= {selectedTicket.ticketPriority == 3}>3</option>
                        <option value="4" selected= {selectedTicket.ticketPriority >= 4}>4</option>
                    </select>
                </h3>

                {/* Used select and option tags manually to create dropdown */}
                <h3>
                    <label htmlFor="ticket-status">Status :</label>
                    <select id="ticket-status" className="ml-2 rounded-md px-2 py-1 mt-4">
                        <option value="open" selected= {selectedTicket.status == "open"}>open</option>
                        <option value="inProgress" selected= {selectedTicket.status == "inProgress"}>inProgress</option>
                        <option value="resolved" selected= {selectedTicket.status == "resolved"}>resolved</option>
                        <option value="onHold" selected= {selectedTicket.status == "onHold"}>onHold</option>
                        <option value="cancelled" selected= {selectedTicket.status == "cancelled"}>cancelled</option>
                    </select>
                </h3>

                {/* Taken from another daisyui modal which was having colse button */}
                <div className="modal-action">
                    <button className="btn btn-primary font-bold">
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