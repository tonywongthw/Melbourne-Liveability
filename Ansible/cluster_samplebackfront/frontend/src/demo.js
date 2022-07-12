import React, { useState, useEffect } from "react";
import Chart from 'chart.js/auto';

const Demo = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch("http://172.26.128.201:30002/file").then((response) => response.json().then((data)=>setData(data)));
  }, []);
  console.log(JSON.stringify(data));
    
  new Chart('myChart', {
    type: "line",
    data: {
      datasets: [
        {
          label: "population density (person/km^2)",
          data: data
          //data: [{"sa3_name": "Brunswick - Coburg", "sa3_code": "20601", "yr": 2019, "population_density": 4878.4}, 
          //{"sa3_name": "Darebin - South", "sa3_code": "20602", "yr": 2019, "population_density": 4156.3}, 
          //{"sa3_name": "Melbourne City", "sa3_code": "20604", "yr": 2019, "population_density": 5690.0}, 
          //{"sa3_name": "Port Phillip", "sa3_code": "20605", "yr": 2019, "population_density": 4498.2}, 
          //{"sa3_name": "Yarra", "sa3_code": "20607", "yr": 2019, "population_density": 4959.8}, 
          //{"sa3_name": "Stonnington - West", "sa3_code": "20606", "yr": 2019, "population_density": 6040.3}, 
          //{"sa3_name": "Essendon", "sa3_code": "20603", "yr": 2019, "population_density": 4108.2}],
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      parsing: {
        xAxisKey: "sa3_name",
        yAxisKey: "population_density"
      }
    }
  });

  return (
    <div>
      <h1>Demo page</h1>
      <div>{JSON.stringify(data)}</div>
      <div style={{height: 400, width: 600, margin: '15px 200px'}}>
        <canvas id="myChart"/>
      </div>
    </div>
  )
};

export default Demo;
