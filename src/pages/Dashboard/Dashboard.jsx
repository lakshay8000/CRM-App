import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { LuDownload } from "react-icons/lu";
import { Margin, usePDF } from "react-to-pdf";

import TicketDetailsModal from '../../components/TicketDetailsModal';
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

    // for react data table component package-
    const columns = [
        {
            name: 'Ticket Id',
            selector: row => row._id,
            grow: 1,
        },
        {
            name: 'Title',
            selector: row => row.title,
            grow: 1
        },
        {
            name: 'Description',
            selector: row => row.description,
            grow: 2,
        },
        {
            name: 'Reporter',
            selector: row => row.assignedTo,
            grow: 2
        },
        {
            name: 'Priority',
            selector: row => row.ticketPriority,
            grow: 1
        },
        {
            name: 'Assignee',
            selector: row => row.assignee,
            grow: 2
        },
        {
            name: 'Status',
            selector: row => row.status,
            grow: 1
        }
    ];

    // for react data table component package-
    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: "1.25rem",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center"
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                display: "flex",
                justifyContent: "center",
            },
        },
    };

    // for react data table component package-
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    return (

        <HomeLayout>
            <div className="tickets-wrapper w-full">
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

                <div className="table-wrapper pt-4">
                    {
                        ticketsState.ticketList
                        &&
                        <div ref={targetRef} >
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
                            />
                        </div>
                    }
                </div>

                <TicketDetailsModal selectedTicket= {selectedTicket} />

            </div>
        </HomeLayout>

    );
}

export default Dashboard;
