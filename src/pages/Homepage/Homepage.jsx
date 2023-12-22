import { useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdCancel, MdEdit, MdOutlinePendingActions  } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";
import { getTickets } from "../../redux/slices/ticketsSlice";




function Homepage() {
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth);

    useEffect(() => {
        if (!authState.isLoggedIn) navigate("/login");
    }, []);            // we are using empty dependency array because even in the case of navigation, the component gets unmounted, means whenever we will come on this page, it will be the initial render and this useEffect will trigger


    const [ticketsState] = useTickets();


    return (
        <>
            <HomeLayout>
                <div className="card-wrapper flex flex-wrap gap-8 mx-4">

                    <Card 
                        titleText="Open"
                        quantity= {ticketsState.ticketDistribution.open}
                        status= {
                            (ticketsState.ticketList.length != 0) ?
                            Math.floor((ticketsState.ticketDistribution.open / ticketsState.ticketList.length) * 100)
                            :
                            0
                        }
                    >
                        <MdEdit size={28} />                     {/* react icon passed as children to Card component */}
                    </Card>

                    <Card
                        titleText="In Progress"
                        quantity= {ticketsState.ticketDistribution.inProgress}
                        status= {
                            (ticketsState.ticketList.length != 0) ?
                            Math.floor((ticketsState.ticketDistribution.inProgress / ticketsState.ticketList.length) * 100)
                            :
                            0
                        }
                    >
                        <TbProgressBolt size={28} />                   
                    </Card>

                    <Card
                        titleText="Resolved"
                        quantity= {ticketsState.ticketDistribution.resolved}
                        status= {
                            (ticketsState.ticketList.length != 0) ?
                            Math.floor((ticketsState.ticketDistribution.resolved / ticketsState.ticketList.length) * 100)
                            :
                            0
                        }
                    >
                        <IoMdDoneAll size={28} />                   
                    </Card>

                    <Card
                        titleText="On Hold"
                        quantity= {ticketsState.ticketDistribution.onHold}
                        status= {
                            (ticketsState.ticketList.length != 0) ?
                            Math.floor((ticketsState.ticketDistribution.onHold / ticketsState.ticketList.length) * 100)
                            :
                            0
                        }
                    >
                        <MdOutlinePendingActions  size={28} />                     
                    </Card>

                    <Card
                        titleText="Cancelled"
                        quantity= {ticketsState.ticketDistribution.cancelled}
                        status= {
                            (ticketsState.ticketList.length != 0) ?
                            Math.floor((ticketsState.ticketDistribution.cancelled / ticketsState.ticketList.length) * 100)
                            :
                            0
                        }
                    >
                        <MdCancel size={28} />                    
                    </Card>

                </div>
            </HomeLayout>
        </>
    );

}

export default Homepage;
