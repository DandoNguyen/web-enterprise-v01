import React, { useState, useEffect } from 'react'
import { Url } from '../URL';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const MyChart = () => {
    // const [chartData, setChartData] = useState({})
    const [getData, setgetData] = useState([])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(Url + "/api/Statistic/AllPostByDepartment", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.listResult[0].value);
                console.log(result.listResult);
                setgetData(result.listResult)
            })
            .catch(error => {
                console.log('error', error)
            });
    }, [])

    console.log(getData);

    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {
        setChartData({
            labels: ["IT", "Business", "Design", "Marketing"],
            datasets: [
                {
                    label: '1',
                    data: [],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                    ]
                },
            ],
        });
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "text01",
                },
            },
        });
    }, [])
    
    

    return (
        <div className='Statistical-chart'>
                    <Bar options={chartOptions} data={chartData} />
                </div>
    )
}
