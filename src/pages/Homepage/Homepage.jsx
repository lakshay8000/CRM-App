import { useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";
import { getTickets } from "../../redux/slices/ticketsSlice";


function Homepage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth);

    useEffect(() => {
        if (!authState.isLoggedIn) navigate("/login");
    }, []);            // we are using empty dependency array because even in the case of navigation, the component gets unmounted, means whenever we will come on this page, it will be the initial render and this useEffect will trigger


    // for getting tickets assigned to the engineer-
    useEffect(() => {
        if (authState.userData.userType == "engineer") {
            dispatch(getTickets());
        }
    }, []);



    return (
        <>
            <HomeLayout>
                <div className="card-wrapper flex flex-wrap gap-8 mx-4">

                    <Card>
                        <MdEdit size={28} />                     {/* react icon passed as children to Card component */}
                    </Card>

                    <Card>
                        <MdEdit size={28} />                     {/* react icon passed as children to Card component */}
                    </Card>

                    <Card>
                        <MdEdit size={28} />                     {/* react icon passed as children to Card component */}
                    </Card>

                    <Card>
                        <MdEdit size={28} />                     {/* react icon passed as children to Card component */}
                    </Card>

                </div>
            </HomeLayout>
        </>
    );

}

export default Homepage;
