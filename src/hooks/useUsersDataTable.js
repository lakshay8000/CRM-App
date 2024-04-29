function useUsersDataTable() {
    const columns = [
        {
            name: 'User Id',
            selector: row => row._id,
            grow: 2
        },
        {
            name: 'Name',
            selector: row => row.name,
            grow: 1
        },
        {
            name: 'Email',
            selector: row => row.email,
            grow: 2
        },
        {
            name: 'Status',
            selector: row => row.userStatus,
            grow: 1
        },
        {
            name: 'Type',
            selector: row => row.userType,
            grow: 1
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                display: "flex",
                justifyContent: "center"
            },
        },
        cells: {
            style: {
                display: "flex",
                justifyContent: "center"
            },
        },
    };

    return [columns, customStyles];
}

export default useUsersDataTable;