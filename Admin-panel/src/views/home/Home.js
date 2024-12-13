import { Card, CardBody } from 'reactstrap';
import CountUp from 'react-countup';
import { appStat, appStat2 } from "./data";
import { Line } from 'react-chartjs-2';
import { FaAndroid, FaAppStoreIos } from "react-icons/fa";
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const appdata = [
    {
        "appId": 1,
        "appName": "yipee",
        "platform": "Android",
        "action": "Downloads",
        "downloads": {
            "totalDownloads": 80000,
        },
        "lastUpdated": "2024-10-15",
        "logo": <FaAndroid className="text-success" />
    },
    {
        "appId": 2,
        "appName": "yipee",
        "platform": "iOS",
        "action": "Downloads",
        "downloads": {
            "totalDownloads": 50000,
        },
        "lastUpdated": "2024-11-01",
        "logo": <FaAppStoreIos className="text-primary" />
    },
    {
        "appId": 3,
        "appName": "yipee",
        "platform": "Android",
        "action": "Uninstall",
        "downloads": {
            "totalDownloads": 0,
        },
        "lastUpdated": "2024-10-15",
        "logo": <FaAndroid className='text-success' />,
    },
    {
        "appId": 4,
        "appName": "yipee",
        "platform": "ios",
        "action": "Uninstall",
        "downloads": {
            "totalDownloads": 0,
        },
        "lastUpdated": "2024-11-01",
        "logo": <FaAppStoreIos className='text-primary' />,
    }
]

function Home() {
    // format download numbers
    const formatNumber = (num) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1);
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1);
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1);
        } else {
            return num.toString();
        }
    };

    const data = {
        labels: appStat.map(val => val.month),
        datasets: [
            {
                label: "Monthly Downloads",
                data: appStat.map(val => val.downloads),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
            }
        ],
    };

    const data2 = {
        labels: appStat2.map(val => val.month),
        datasets: [
            {
                label: "Monthly Downloads",
                data: appStat2.map(val => val.downloads),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Android Monthly Downloads',

            },
        },
    };

    const options2 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'IOS Monthly Downloads',

            },
        },
    };

    const chartContainerStyle = {
        width: "100%",
        height: "50vh",
        position: "relative"
    }

    return (
        <div>
            <div>
                <h4>App Statistics</h4>
                <div className='d-flex flex-wrap justify-content-between'>
                    {
                        appdata?.map((val, index) => (
                            <div className='col-6 col-md-3'>
                                <Card key={val.appId} className='rounded-2 shadow border-1 ms-1' >
                                    <CardBody className="text-center">
                                        <span className='fs-3'>{val.logo}</span>
                                        <div>
                                            <h4 className='text-capitalize mb-0'>{val.action}</h4>

                                            {/*  Count App download */}
                                            <CountUp
                                                className="account-balance"
                                                style={{ fontSize: "1.5rem" }}
                                                start={0}
                                                end={formatNumber(val.downloads.totalDownloads)}
                                                duration={1}
                                                useEasing={true}
                                                separator=","
                                            />
                                            {/* Millon, thounsand */}
                                            <span style={{ fontSize: "1.5rem" }}>
                                                {val.downloads.totalDownloads >= 1000000000 ? "B" :
                                                    val.downloads.totalDownloads >= 1000000 ? "M" :
                                                        val.downloads.totalDownloads >= 1000 ? "K" : null
                                                }
                                            </span>
                                            {/*  for + icon */}
                                            {val.downloads.totalDownloads >= 1000 ? <span style={{ fontSize: "1.5rem" }}>+</span> : null}
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        ))

                    }
                </div>

                <div className='d-sm-flex gap-sm-2 mt-4 mt-sm-0 px-2' style={chartContainerStyle}>
                    <Card className='col-12 col-sm-6 shadow'>
                        <CardBody>
                            <Line data={data} options={options} />
                        </CardBody>
                    </Card>
                    <Card className='col-12 col-sm-6 shadow'>
                        <CardBody>
                            <Line data={data2} options={options2} />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
};


export default Home;


