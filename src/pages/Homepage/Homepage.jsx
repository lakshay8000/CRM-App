import { useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdCancel, MdEdit, MdOutlinePendingActions } from "react-icons/md";
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
        <HomeLayout>
            <div className="card-wrapper flex flex-wrap gap-8 w-4/5">

                <Card
                    titleText="Open"
                    quantity={ticketsState.ticketDistribution.open}
                    status={
                        (ticketsState.ticketList.length != 0) ?
                            Math.floor((ticketsState.ticketDistribution.open / ticketsState.downloadedTickets.length) * 100)
                            :
                            0
                    }
                    ticketCategory="open"
                >
                    <MdEdit size={28} />                     {/* react icon passed as children to Card component */}
                </Card>

                <Card
                    titleText="In Progress"
                    quantity={ticketsState.ticketDistribution.inProgress}
                    status={
                        (ticketsState.ticketList.length != 0) ?
                            Math.floor((ticketsState.ticketDistribution.inProgress / ticketsState.downloadedTickets.length) * 100)
                            :
                            0
                    }
                    ticketCategory="inProgress"
                >
                    <TbProgressBolt size={28} />
                </Card>

                <Card
                    titleText="Resolved"
                    quantity={ticketsState.ticketDistribution.resolved}
                    status={
                        (ticketsState.ticketList.length != 0) ?
                            Math.floor((ticketsState.ticketDistribution.resolved / ticketsState.downloadedTickets.length) * 100)
                            :
                            0
                    }
                    ticketCategory="resolved"
                >
                    <IoMdDoneAll size={28} />
                </Card>

                <Card
                    titleText="On Hold"
                    quantity={ticketsState.ticketDistribution.onHold}
                    status={
                        (ticketsState.ticketList.length != 0) ?
                            Math.floor((ticketsState.ticketDistribution.onHold / ticketsState.downloadedTickets.length) * 100)
                            :
                            0
                    }
                    ticketCategory="onHold"
                >
                    <MdOutlinePendingActions size={28} />
                </Card>

                <Card
                    titleText="Cancelled"
                    quantity={ticketsState.ticketDistribution.cancelled}
                    status={
                        (ticketsState.ticketList.length != 0) ?
                            Math.floor((ticketsState.ticketDistribution.cancelled / ticketsState.downloadedTickets.length) * 100)
                            :
                            0
                    }
                    ticketCategory="cancelled"
                >
                    <MdCancel size={28} />
                </Card>

            </div>
        </HomeLayout>
    );

}

export default Homepage;
