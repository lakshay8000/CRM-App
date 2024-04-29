import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { LuDownload } from "react-icons/lu";
import { Margin, usePDF } from "react-to-pdf";

import TicketDetailsModal from '../../components/TicketDetailsModal';
import useDashboardDataTable from '../../hooks/useDashboardDataTable';
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";


// tickets dashboard-
function Dashboard() {
    const [ticketsState] = useTickets();    

    // details to be shown on click of rows-
    const [selectedTicket, setSelectedTicket] = useState({});

    // using react-to-pdf package for export to pdf functionality-
    const { toPDF, targetRef } = usePDF({
        filename: `Tickets.pdf`, // edit here
        page: {
            orientation: "landscape",
            margin: Margin.SMALL,
        },
    });

    // custom hook
    const [columns, customStyles] = useDashboardDataTable();

    // for react data table component package-
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


    return (

        <HomeLayout>
            <div className="tickets-wrapper w-full mb-8">
                <div className="tickets-heading flex items-center pb-5 border-b-2 border-b-primary">
                    <div className="basis-[65%] text-2xl font-bold"> Tickets Record </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered input-primary w-full max-w-xs"
                    />

                    <div
                        className="tooltip tooltip-left ml-auto mr-2"
                        data-tip="Download PDF"
                    >
                        <LuDownload
                            size={"1.5rem"}
                            className="hover:cursor-pointer"
                            onClick={() => toPDF()}
                        />
                    </div>
                </div>

                <div className="table-wrapper pt-4 max-w-full">
                    {
                        ticketsState.ticketList
                        &&
                        <div ref={targetRef} className='max-w-full' >
                            <DataTable
                                columns={columns}
                                data={ticketsState.ticketList}
                                customStyles={customStyles}
                                expandableRows
                                expandableRowsComponent={ExpandedComponent}
                                onRowClicked={(row) => {
                                    // console.log(row);
                                    setSelectedTicket({
                                        ...row
                                    });
                                    document.getElementById('ticket-details-modal').showModal();
                                }}
                                onRowMouseEnter={(row, event) => {
                                    event.target.style.cursor = "pointer";
                                }}
                                onRowMouseLeave={(row, event) => {
                                    event.target.style.cursor = "auto";
                                }}
                            />
                        </div>
                    }
                </div>

                <TicketDetailsModal 
                    selectedTicket= {selectedTicket} 
                    setSelectedTicket= {setSelectedTicket}
                />

            </div>
        </HomeLayout>

    );
}

export default Dashboard;