import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { axiosInstance } from "../config/axiosInstance";


function UserDetailsModal({ userDisplay, setUserDisplay, resetTable }) {
    
    const authState= useSelector(state => state.auth);
    const modal= document.getElementById("user-details-modal");

    async function handleUserChange(e) {
        const dropdownName= e.target.parentNode.parentNode.getAttribute("name");
        
        // for closing the dropdown (instructions for closing dropdown on daisyui website)
        const dropdownElement= document.getElementById(`${dropdownName}Dropdown`);
        dropdownElement.removeAttribute("open");

        // update user on backend-
        if (authState.userData.userStatus == "approved") {
            const response = axiosInstance.patch("user/updateUser", {
                userId: userDisplay._id,
                updates: {
                    ...userDisplay,
                    [dropdownName]: e.target.textContent
                }
            },
                {
                    headers: {
                        "x-access-token": localStorage.getItem("token")
                    }
                }
            );
    
            toast.promise(response, {
                loading: 'Updating User',
                success: 'Successfully updated the user',
                error: 'Something went wrong',
            });
            await response;    // awaiting like this because of toast.promise
    
            // update status in userDisplay state so that it re renders the current state and show that on the dropdown
            setUserDisplay({
                ...userDisplay,
                [dropdownName]: e.target.textContent
            });
    
            // to update the table-
            resetTable();
        }

        else {
            modal.close();
            toast.error("Admin is not approved");
        }
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
                    <details id= "userStatusDropdown" className="dropdown ml-6">
                        <summary className="m-1 btn"> {userDisplay.userStatus} </summary>
                        <ul name= "userStatus" onClick={handleUserChange} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52" >
                            <li><a>approved</a></li>
                            <li><a>suspended</a></li>
                            <li><a>rejected</a></li>
                        </ul>
                    </details>
                </div>

                <div className="pt-8">
                    Type :
                    <details id= "userTypeDropdown" className="dropdown ml-6">
                        <summary className="m-1 btn"> {userDisplay.userType} </summary>
                        <ul name= "userType" onClick={handleUserChange} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li><a>customer</a></li>
                            <li><a>engineer</a></li>
                        </ul>
                    </details>
                </div>

                <p className="pt-8"> Email : {userDisplay.email} </p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default UserDetailsModal;