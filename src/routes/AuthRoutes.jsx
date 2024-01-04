import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";


// This will be the component of the parent Route in MainRoutes.jsx-
function AuthRoutes({allowedRoles}) {
    const authState= useSelector(state => state.auth);
    const role= authState.userData.userType;     // current user's role

    return (
        <>
        {
            // Note- allowedRoles is an array
            allowedRoles.find((allowedRole) => role == allowedRole) ?
            // Outlet means the child Route in MainRoutes.jsx
            <Outlet />  
            :
            <div> Denied </div>
        }
        </>
    );
}

export default AuthRoutes;