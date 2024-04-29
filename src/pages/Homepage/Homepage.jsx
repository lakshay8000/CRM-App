import { useEffect } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { IoMdDoneAll } from "react-icons/io";
import { MdCancel, MdEdit, MdOutlinePendingActions } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import useCharts from "../../hooks/useCharts";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";




function Homepage() {
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth);

    useEffect(() => {
        if (!authState.isLoggedIn) navigate("/login");
    }, []);  // we are using empty dependency array because even in the case of navigation, the component gets unmounted, means whenever we will come on this page, it will be the initial render and this useEffect will trigger


    const [ticketsState] = useTickets();
    const [pieChartData, lineChartData, lineChartOptions, barChartData, barChartOptions] = useCharts(ticketsState);

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
                        <MdEdit size={28} />    {/* react icon passed as children to Card component */}
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

                <div className='w-full flex flex-col justify-center items-center gap-8 mb-16'>
                    <div className="text-2xl">Tickets data of past 15 days-</div>
                    <div className='line-chart w-[60rem]'>
                        <Line options={lineChartOptions} data={lineChartData} />
                    </div>
                </div>

                <div className="bar-chart mb-16">
                    <Bar data={barChartData} options={barChartOptions}/>
                </div>
            
            </div>
        </HomeLayout>
    );

}

export default Homepage;