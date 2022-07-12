// fetch the sorted testGet2 data and display top 10 suburbs with most positive tweets according to positive value
import React, { useState, useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

const Newpage = () => {
  const [data, setData] = useState({});
  const [fetched, setFetched] = useState(false);
  const [top10positive, setTop10positive] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    async function fetchData() {
        const result = await fetch("http://172.26.128.201:30003/testGet2/sorted").then((response) => response.json())
        setData(result);
        let top10pos = [];
        var i = 0;
        for (const item of result["rows"]) {
          if (i < 10 & item["key"][1] == "positive") {
            top10pos[i] = {"suburbs": item["key"][0], "value": item["value"]};
            i += 1;
          }
        }
        setTop10positive(top10pos);
        setFetched(true);
    }
    fetchData();
  }, []);

  const barRef = chartRef.current;
  useEffect(() => {
    new Chart(barRef, {
      type: "bar",
      data: {
        datasets: [{
          label: "positive value",
          data: top10positive
          //data: [{"suburbs": "Melbourne", "value": 492}, {"suburbs": "Southbank", "value": 130}, 
          //{"suburbs": "Frankston North", "value": 122}, {"suburbs": "Yarra Valley", "value": 103}, 
          //{"suburbs": "St Kilda", "value": 100}, {"suburbs": "Carlton", "value": 83}, 
          //{"suburbs": "East Melbourne", "value": 83}, {"suburbs": "Richmond (Vic.)", "value": 80}, 
          //{"suburbs": "South Yarra - East", "value": 77}, {"suburbs": "Hoppers Crossing", "value": 75}]
          }]
      },
      options: {
        parsing: {
            xAxisKey: "suburbs",
            yAxisKey: "value"
        },
        plugins: {
          title: {
            display: true,
            text: "Top10 suburbs with most positive tweets about testGet2"
          }
        }
      }
    });
  }, [top10positive])

  return (
    <div>
      <h1>New page</h1>
      {fetched ? <></> : <div>Loading...</div>}
      <div style={{height: 400, width: 600, margin: '15px 200px'}}>
        <canvas id="myChart" ref={chartRef}/>
      </div>
    </div>
  )
};

export default Newpage;
