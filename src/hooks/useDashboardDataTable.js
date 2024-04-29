function useDashboardDataTable() {
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
            name: 'Assigned To',
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
                justifyContent: "center",
                lineHeight: 4
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                display: "flex",
                justifyContent: "center",
                lineHeight: 4
            },
        },
    };

    return [columns, customStyles];
}

export default useDashboardDataTable;