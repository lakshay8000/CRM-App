import { ArcElement, BarElement,CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from "react";

function useCharts(ticketsState) {
    // here we will store the date as key and number of tickets as value-
    const [ticketsChartData, setTicketsChartData] = useState({
        open : {},
        inProgress : {},
        resolved : {},
        onHold : {},
        cancelled : {},
        openTicketsByMonth : {},
        inProgressTicketsByMonth : {},
        resolvedTicketsByMonth : {},
        onHoldTicketsByMonth : {},
        cancelledTicketsByMonth : {}
    });

    // for react chartjs2 pie chart and line chart-
    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement);

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

            // freq map for monthly tickets data with initial value as 0-
            const monthlyOpenTickets= {January : 0, February : 0, March : 0, April : 0, May : 0, June : 0, July : 0, August : 0, September : 0, October : 0, November : 0, December : 0};
            const monthlyinProgressTickets= {January : 0, February : 0, March : 0, April : 0, May : 0, June : 0, July : 0, August : 0, September : 0, October : 0, November : 0, December : 0};
            const monthlyResolvedTickets= {January : 0, February : 0, March : 0, April : 0, May : 0, June : 0, July : 0, August : 0, September : 0, October : 0, November : 0, December : 0};
            const monthlyOnHoldTickets= {January : 0, February : 0, March : 0, April : 0, May : 0, June : 0, July : 0, August : 0, September : 0, October : 0, November : 0, December : 0};
            const monthlyCancelledTickets= {January : 0, February : 0, March : 0, April : 0, May : 0, June : 0, July : 0, August : 0, September : 0, October : 0, November : 0, December : 0};
    
            // create freq maps for line charts with dates as key and all the initial values as 0-
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

                // populate monthly freq maps-
                const date= new Date(ticket.createdAt.split("T")[0]);            // this will give us the date string of ticket
                const month= date.toLocaleString('default', { month: 'long' });  // this will give us the month name from js date object

                // console.log(month);
                if (ticket.status == "open") {
                    monthlyOpenTickets[month] ++ ;
                }
                else if (ticket.status == "inProgress") {
                    monthlyinProgressTickets[month] ++ ;
                }
                else if (ticket.status == "resolved") {
                    monthlyResolvedTickets[month] ++ ;
                }
                else if (ticket.status == "onHold") {
                    monthlyOnHoldTickets[month] ++ ;
                }
                else if (ticket.status == "cancelled") {
                    monthlyCancelledTickets[month] ++ ;
                }
            });

            // console.log(monthlyOpenTickets);
    
            // update ticketChartData state-
            setTicketsChartData({
                open : openTicketsData,
                inProgress : inProgressTicketsData,
                resolved : resolvedTicketsData,
                onHold : onHoldTicketsData,
                cancelled : cancelledTicketsData,
                openTicketsByMonth : monthlyOpenTickets,
                inProgressTicketsByMonth : monthlyinProgressTickets,
                resolvedTicketsByMonth : monthlyResolvedTickets,
                onHoldTicketsByMonth : monthlyOnHoldTickets,
                cancelledTicketsByMonth : monthlyCancelledTickets
            });
        }
    }

    useEffect(() => {
        processTickets(15);
    }, [ticketsState.ticketList]);

    const lineChartLabels = Object.keys(ticketsChartData.open);  // this will return us the array of dates according to the range passed. Dates will be the same for all the ticket categories
    const lineChartData = {
        labels : lineChartLabels,
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

    const barChartOptions = {
        scales: {
            y: {
                   beginAtZero: true,
                   ticks: {
                     stepSize: 1,
                   },
            },
        },
    };

    const barChartLabels= Object.keys(ticketsChartData.openTicketsByMonth);
    const barChartData = {
        labels : barChartLabels,
        datasets: [
          {
            label: 'Open',
            data: Object.values(ticketsChartData.openTicketsByMonth),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'In Progress',
            data: Object.values(ticketsChartData.inProgressTicketsByMonth),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Resolved',
            data: Object.values(ticketsChartData.resolvedTicketsByMonth),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
          },
          {
            label: 'On Hold',
            data: Object.values(ticketsChartData.onHoldTicketsByMonth),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Cancelled',
            data: Object.values(ticketsChartData.cancelledTicketsByMonth),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
          },
        ],
    };

    return [pieChartData, lineChartData, lineChartOptions, barChartData, barChartOptions];
}

export default useCharts;