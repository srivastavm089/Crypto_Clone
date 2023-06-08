import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

 ChartJS.register(
    CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)
const Chart = ({arrr=[]}, currency,days) => {
   
   
    const  dates = [];
    const price = [];
    arrr.forEach((item)=>{
        if(days==='24h')  dates.push(new Date(item[0]).toLocaleTimeString())
        else  dates.push(new Date(item[0]).toLocaleDateString())
        price.push(item[1]);
       
    })
   
    const data ={
        labels: dates,
        datasets: [
          {
            id:1,
            label: `Prices in ${currency}`,
            data: price,
            borderColor: "rgba(255,99,132)",
            hoverBackgroundColor: "rgba(255,99,132,0.5)",
          },
        ],
      }
    return (
        <Line
        datasetIdKey="id"
          options={{ responsive: true }}
          data={data}
        />
      );
    };
    
    export default Chart;
