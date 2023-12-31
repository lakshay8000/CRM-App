import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect } from "react";
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { IoMdDoneAll } from "react-icons/io";
import { MdCancel, MdEdit, MdOutlinePendingActions } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";




function Homepage() {
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth);

    useEffect(() => {
        if (!authState.isLoggedIn) navigate("/login");
    }, []);            // we are using empty dependency array because even in the case of navigation, the component gets unmounted, means whenever we will come on this page, it will be the initial render and this useEffect will trigger


    const [ticketsState] = useTickets();


    // for react chartjs2-
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: Object.keys(ticketsState.ticketDistribution),
        datasets: [
            {
                label: '# of Tickets',
                data: Object.values(ticketsState.ticketDistribution),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <HomeLayout>
            <div className='flex flex-col gap-12 w-4/5'>
                <div className="card-wrapper flex flex-wrap gap-8 ">

                    <Card
                        titleText="Open"
                        quantity={ticketsState.ticketDistribution.open}
                        status={
                            (ticketsState.ticketList.length != 0) ?
                                ((ticketsState.ticketDistribution.open / ticketsState.downloadedTickets.length) * 100).toString().substring(0,4)
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
                                ((ticketsState.ticketDistribution.inProgress / ticketsState.downloadedTickets.length) * 100).toString().substring(0,4)
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
                                ((ticketsState.ticketDistribution.resolved / ticketsState.downloadedTickets.length) * 100).toString().substring(0,4)
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
                                ((ticketsState.ticketDistribution.onHold / ticketsState.downloadedTickets.length) * 100).toString().substring(0,4)
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
                                ((ticketsState.ticketDistribution.cancelled / ticketsState.downloadedTickets.length) * 100).toString().substring(0,4)
                                :
                                0
                        }
                        ticketCategory="cancelled"
                    >
                        <MdCancel size={28} />
                    </Card>

                </div>

                <div className="charts w-[28rem] h-[28rem] mb-4">
                    <Pie data={data} />
                </div>
            </div>
        </HomeLayout>
    );

}

export default Homepage;
