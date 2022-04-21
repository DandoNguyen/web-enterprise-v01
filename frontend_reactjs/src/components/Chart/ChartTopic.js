import React, { useState, useEffect } from 'react'
import { Url } from '../URL';
import { Bar } from "react-chartjs-2";
import './Chartpage.css'
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


export const ChartTopic = () => {
    const [getData, setgetData] = useState([])
    const [getfile, setgetfile] = useState([])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(Url + "/api/Statistic/AllPostByTopic", requestOptions)
            .then(response => response.json())
            .then(result => {
                setgetData(result.listResult)
                setgetfile(result)
            })
            .catch(error => {
                console.log('error', error)
            });
    }, [])
   
    const nameData = getData.map(data => [data.dataName])
    const valueData = getData.map(data => [data.percent])
    const state = {
        labels: nameData,
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: valueData
            }
        ]
    }
    const download = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        fetch(Url + `/api/FileAction/GetFile?filePath=${getfile.filesPaths}`, requestOptions)
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          // the filename you want
          a.download = getfile.filesPaths[0];
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          alert('your file has downloaded!'); // or you know, something with better UX...
        })
        .catch(() => alert('oh no!'));
      }

    return (
        <div>
            <div className='chart'>
            <h1 className='text'>All Post By Topic</h1>
            <Bar
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
            <button onClick={download}>Download</button>
            </div>
        </div>
    )
}
