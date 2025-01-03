import React, { useState } from 'react'
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend
} from 'chart.js';
import { dummyData } from './data';
import { Card, CardBody } from 'reactstrap';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Sample() {
    const [selectedView, setSelectedView] = useState('monthly');

    const data3 = {
        labels: selectedView === "monthly" ? dummyData.monthlyData.map(val => val.month) : dummyData.yearlyData.map(val => val.year),
        datasets: [
            {
                label: 'Downloads',
                data: selectedView === 'monthly' ? dummyData.monthlyData.map(item => item.downloads) : dummyData.yearlyData.map(item => item.downloads),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderWidth: 2,

                fill: true
            },
            {
                label: 'Uninstalls',
                data: selectedView === 'monthly' ? dummyData.monthlyData.map(item => item.uninstalls) : dummyData.yearlyData.map(item => item.uninstalls),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: true
            },
            {
                label: 'Active Users',
                data: selectedView === 'monthly' ? dummyData.monthlyData.map(item => item.activeUsers) : dummyData.yearlyData.map(item => item.activeUsers),
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true
            }
        ]
    }

    const handleFilterChange = (event) => {
        setSelectedView(event.target.value);
    };

    const options3 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Android Application Statistics',
                font: {
                    size: 18,

                }
            },
            tooltip: {
                enabled: true,
                mode: 'point',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                },
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: selectedView === "monthly" ? 'Month' : "Year",
                    font: {
                        // size: 16,
                        weight: 'bold',
                    },
                    padding: { top: 5, bottom: 1 }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'No of Apps',
                    font: {
                        // size: 16,
                        weight: 'bold',
                    },
                    padding: { top: 5, bottom: 1 }
                },

                beginAtZero: true
            }
        }
    };

    const chartContainerStyle = {
        width: "100%",
        height: "50vh",
        position: "relative"
    }

    return (
        <div>
            <div className='d-sm-flex gap-sm-2 mt-4 mt-sm-0 px-2' style={chartContainerStyle}>
                <Card className='col-12 col-sm-6 shadow'>
                    <select value={selectedView}
                        onChange={handleFilterChange}
                        className='position-absolute form-select remove-focus-ring'
                        style={{ width: "18%", transform: "translate(450px,17px)", fontSize: "13px" }} >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                    <CardBody >
                        <Line data={data3} options={options3} />
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Sample
