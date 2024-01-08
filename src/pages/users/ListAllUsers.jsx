import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

import UserDetailsModal from "../../components/UserDetailsModal";
import { axiosInstance } from "../../config/axiosInstance";
import HomeLayout from "../../layouts/HomeLayout";

function ListAllUsers() {
    const [userList, setUserList] = useState([]);              // for showing list of all users in the table
    const [userDisplay, setUserDisplay] = useState({           // details to be shown on click of rows
        name: '',
        email: '',
        userType: '',
        userStatus: '',
        clientName: '',
        _id : ""
    });

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
            <div className="min-h-90vh flex flex-col justify-center w-[50rem]">

                <h1 className="text-center font-bold text-5xl mb-8">
                    Users List
                </h1>

                {
                    userList.length > 0
                    &&
                    <DataTable
                        columns={columns}
                        data={userList}
                        customStyles={customStyles}
                        onRowClicked={(row) => {
                            // we will do functional update of state to update the state instantly-
                            setUserDisplay(() => {
                                return (
                                    {
                                        name: row.name,
                                        email: row.email,
                                        userType: row.userType,
                                        userStatus: row.userStatus,
                                        clientName: row.clientName,
                                        _id : row._id
                                    }
                                );
                            });
                            // for showing daisyui modal-
                            document.getElementById('user-details-modal').showModal();
                        }}
                        onRowMouseEnter={(row, event) => {
                            event.target.style.cursor = "pointer";
                        }}
                        onRowMouseLeave={(row, event) => {
                            event.target.style.cursor = "auto";
                        }}
                    />
                }

                <UserDetailsModal 
                    userDisplay= {userDisplay} 
                    setUserDisplay= {setUserDisplay}
                    resetTable= {loadUsers}
                />

            </div>
        </HomeLayout>
    );
}

export default ListAllUsers;
