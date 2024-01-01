import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip,  } from 'chart.js';
import { useEffect } from "react";
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
              ticks: {
                stepSize: 1, // Set the step size for the y-axis ticks
              },
            },
          },
    };
      
    // this functioon will return us an obj with dates as key and their default values as 0
    function getDateRange(range) {        
        // get start date in the format YYYY-MM-DD. Start date= curr date - range
        let startDate= new Date();
        startDate.setDate(startDate.getDate() - range);
        // console.log(startDate);

        // Add all the dates from start date to curr date in an obj-
        const dateMap= {};
        for (let i= 0; i< range; i++) {
            let date= startDate;
            date.setDate(date.getDate() + 1);
            date= date.toLocaleString().split(",")[0].split("/").reverse().join("-");
            
            dateMap[date] = 0;
        }

        // console.log(dateMap);
        return dateMap;
    }

    // this function will populate the frequency map according to the ticket category passed as argument
    function mapTicketsWithDates(category) {
        const frequencyMap= getDateRange(15);
        const filteredTicketList= ticketsState.ticketList.filter((ticket) => ticket.status == category);

        // populate frequency map-
        filteredTicketList.forEach((ticket) => {
            if (
                frequencyMap[ticket.createdAt.substring(0, 10)]
                ||
                frequencyMap[ticket.createdAt.substring(0, 10)] == 0
            ) {
                frequencyMap[ticket.createdAt.substring(0, 10)] ++ ;
            }
        });

        // console.log(frequencyMap);
        return frequencyMap;
    }

    const labels = Object.keys(getDateRange(15));

    const lineChartData = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: Object.values(mapTicketsWithDates("open")),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'In Progress',
                data: mapTicketsWithDates("inProgress"),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Resolved',
                data: mapTicketsWithDates("resolved"),
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
            },
            {
                label: 'On Hold',
                data: mapTicketsWithDates("onHold"),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Cancelled',
                data: mapTicketsWithDates("cancelled"),
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