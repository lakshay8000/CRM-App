import { LuDownload } from "react-icons/lu";

import useTickets from "../../hooks/useTickets";


// tickets dashboard-
function Dashboard() {
    const [ticketsState]= useTickets();

    return (
        <div className="tickets-wrapper p-4">
            <div className="tickets-heading flex items-center pb-5 border-b-2 border-b-primary">
                <div className="basis-[65%] text-2xl font-bold"> Tickets Record </div>
                <input type="text" placeholder="Search" className="input input-bordered input-primary w-full max-w-xs" />
                <LuDownload size={"1.5rem"} className="ml-auto" />
            </div>

            <div className="table-wrapper pt-4">
                <div className="overflow-x-auto h-96">
                    <table className="table table-pin-rows table-md">
                        <thead>
                            <tr className="text-xl text-center">
                                <th></th>
                                <th>Ticket Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Reporter</th>
                                <th>Priority</th>
                                <th>Asignee</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (ticketsState.length != 0) &&
                                ticketsState.ticketList.map((ticket, index) => {
                                    return (
                                        <tr key={ticket._id} className="text-center">
                                            <th>{index + 1}</th>
                                            <td>{ticket._id}</td>
                                            <td>{ticket.title}</td>
                                            <td>{ticket.description}</td>
                                            <td>{ticket.assignedTo}</td>
                                            <td>{ticket.ticketPriority}</td>
                                            <td>{ticket.assignee}</td>
                                            <td>{ticket.status}</td>
                                        </tr>
                                    );
                                })
                            }
                             
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;