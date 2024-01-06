import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

import { axiosInstance } from "../../config/axiosInstance";
import HomeLayout from "../../layouts/HomeLayout";

function ListAllUsers() {
    const [userList, setUserList] = useState([]);

    async function loadUsers() {
        const response = await axiosInstance.get("users", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        });
        setUserList([...response?.data?.result]);    // In case of error, Spreading undefined or null will result in an empty array in the context of creating a new array with the spread operator
    }

    useEffect(() => {
        loadUsers();
    }, []);

    // for react data table component package-
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

    return (
        <HomeLayout>
            <div className="min-h-90vh flex justify-center w-[50rem]">
                {
                    userList.length > 0
                    &&
                    <DataTable
                        columns={columns}
                        data={userList}
                        customStyles={customStyles}
                    />
                }
            </div>
        </HomeLayout>
    );
}

export default ListAllUsers;
