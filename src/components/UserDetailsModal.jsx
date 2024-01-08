import { useRef } from "react";
import toast from "react-hot-toast";

import { axiosInstance } from "../config/axiosInstance";

function UserDetailsModal({ userDisplay, setUserDisplay, resetTable }) {

    const userStatusDropdownRef = useRef();
    
    async function handleStatusChange(e) {
        // for closing the dropdown (instructions for closing dropdown on daisyui website)
        userStatusDropdownRef.current.removeAttribute("open");

        // update user on backend-
        const response = axiosInstance.patch("user/updateUser", {
            userId: userDisplay._id,
            updates: {
                name: userDisplay.name,
                email: userDisplay.email,
                userType: userDisplay.userType,
                userStatus: e.target.textContent,
                clientName: userDisplay.clientName,
                _id: userDisplay._id
            }
        },
        {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        });

        toast.promise(response, {
            loading: 'Updating User',
            success: 'Successfully updated the user',
            error: 'Something went wrong',
        });
        await response;    // awaiting like this because of toast.promise

        // update status in userDisplay state so that it re renders the current state and show that on the dropdown
        setUserDisplay({
            ...userDisplay,
            userStatus: e.target.textContent,
            name : "lakshay"
        });

        // to update the table-
        resetTable();
    }

    return (
        // Daisyui Modal-
        <dialog id="user-details-modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-3xl"> User Details </h3>
                <p className="pt-8"> Name : {userDisplay.name} </p>
                <p className="pt-8"> Client Name : {userDisplay.clientName} </p>

                <div className="pt-8">
                    Status :
                    <details className="dropdown ml-6" ref={userStatusDropdownRef} >
                        <summary className="m-1 btn"> {userDisplay.userStatus} </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52" onClick={handleStatusChange} >
                            <li><a> approved </a></li>
                            <li><a> suspended </a></li>
                            <li><a> rejected </a></li>
                        </ul>
                    </details>
                </div>

                <p className="pt-8"> Type : {userDisplay.userType} </p>
                <p className="pt-8"> Email : {userDisplay.email} </p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default UserDetailsModal;