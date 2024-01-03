import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip,  } from 'chart.js';
import { useEffect, useState } from "react";
import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
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
    
    // here we will store the date as key and number of tickets as value-
    const [ticketsChartData, setTicketsChartData] = useState({
        open : {},
        inProgress : {},
        resolved : {},
        onHold : {},
        cancelled : {}
    });

    useEffect(() => {
        if (!authState.isLoggedIn) navigate("/login");
    }, []);            // we are using empty dependency array because even in the case of navigation, the component gets unmounted, means whenever we will come on this page, it will be the initial render and this useEffect will trigger


    const [ticketsState] = useTickets();


    // for react chartjs2 pie chart and line chart-
    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

    const pieChartData = {
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

    // for line chart-
    const lineChartOptions = {
        scales: {
            y: {
                   beginAtZero: true,
                   ticks: {
                     stepSize: 1,
                   },
            },
        },
    };
      
    // this fn will create a freq map for all the ticket categories with dates as key and number of tickets as value and then we will update the ticketsChartData state.
    function processTickets(range) {
        if (ticketsState.ticketList.length > 0) {

            // get the starting date with help of range passed as argument
            let startDate= new Date();
            startDate.setDate(startDate.getDate() - range);
            // console.log(startDate);
    
            // freq map for all  the ticket categories-
            const openTicketsData= {};
            const inProgressTicketsData= {};
            const resolvedTicketsData= {};
            const onHoldTicketsData= {};
            const cancelledTicketsData= {}; 
    
            // create a freq map with all the initial values as 0-
            for (let i= 0; i< range; i++) {
                let date= startDate;
                date.setDate(date.getDate() + 1);
                date= date.toLocaleString().split(",")[0].split("/").reverse().join("-");
                
                openTicketsData[date] = 0;
                inProgressTicketsData[date] = 0;
                resolvedTicketsData[date] = 0;
                onHoldTicketsData[date] = 0;
                cancelledTicketsData[date] = 0;
            }
    
            // iterate over ticketList array and populate all the frequency maps-
            ticketsState.ticketList.forEach((ticket) => {
                if (ticket.status == "open" 
                    && 
                    (
                    openTicketsData[ticket.createdAt.substring(0, 10)]
                    ||
                    openTicketsData[ticket.createdAt.substring(0, 10)] == 0
                    )
                    ) {
                    openTicketsData[ticket.createdAt.substring(0, 10)] ++ ;
                }
                else if (ticket.status == "inProgress" 
                    && 
                    (
                    inProgressTicketsData[ticket.createdAt.substring(0, 10)]
                    ||
                    inProgressTicketsData[ticket.createdAt.substring(0, 10)] == 0
                    )
                    ) {
                    inProgressTicketsData[ticket.createdAt.substring(0, 10)] ++ ;
                }
                else if (ticket.status == "resolved" 
                    && 
                    (
                    resolvedTicketsData[ticket.createdAt.substring(0, 10)]
                    ||
                    resolvedTicketsData[ticket.createdAt.substring(0, 10)] == 0
                    )
                    ) {
                    resolvedTicketsData[ticket.createdAt.substring(0, 10)] ++ ;
                }
                else if (ticket.status == "onHold" 
                    && 
                    (
                    onHoldTicketsData[ticket.createdAt.substring(0, 10)]
                    ||
                    onHoldTicketsData[ticket.createdAt.substring(0, 10)] == 0
                    )
                    ) {
                    onHoldTicketsData[ticket.createdAt.substring(0, 10)] ++ ;
                }
                else if (ticket.status == "cancelled" 
                    && 
                    (
                    cancelledTicketsData[ticket.createdAt.substring(0, 10)]
                    ||
                    cancelledTicketsData[ticket.createdAt.substring(0, 10)] == 0
                    )
                    ) {
                    cancelledTicketsData[ticket.createdAt.substring(0, 10)] ++ ;
                }
            });
    
            // update ticketChartData state-
            setTicketsChartData({
                open : openTicketsData,
                inProgress : inProgressTicketsData,
                resolved : resolvedTicketsData,
                onHold : onHoldTicketsData,
                cancelled : cancelledTicketsData
            });
        }
    }

    useEffect(() => {
        processTickets(15);
    }, [ticketsState.ticketList]);

    const labels = Object.keys(ticketsChartData.open);  // this will return us the array of dates according to the range passed. Dates will be the same for all the ticket categories

    const lineChartData = {
        labels,
        datasets: [
            {
                label: 'Open',
                data: Object.values(ticketsChartData.open),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'In Progress',
                data: Object.values(ticketsChartData.inProgress),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Resolved',
                data: Object.values(ticketsChartData.resolved),
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
            },
            {
                label: 'On Hold',
                data: Object.values(ticketsChartData.onHold),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Cancelled',
                data: Object.values(ticketsChartData.cancelled),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
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

                <div className='w-full flex justify-center my-16'>
                    <div className="pie-chart w-[28rem] h-[28rem]">
                        <Pie data={pieChartData} />
                    </div>
                </div>

                <div className='w-full flex justify-center'>
                    <div className='line-chart w-[60rem] mb-16'>
                        <Line options={lineChartOptions} data={lineChartData} />
                    </div>
                </div>
            
            </div>
        </HomeLayout>
    );

}

export default Homepage;