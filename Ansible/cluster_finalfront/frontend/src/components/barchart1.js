import React, { useRef, useState, useEffect } from "react";
import Chart from 'chart.js/auto';

// set a conversion for selection and real-backend-ouptup key
const conversion = {
    "mortgage": ["median_mortgage_repay_monthly", "median mortgage monthly"],
    "rent": ["median_rent_weekly", "median rent weekly"],
    "familyinc": ["median_tot_fam_inc_weekly", "median family income weekly"],
    "pesonalinc": ["median_tot_prsnl_inc_weekly", "median personal income weekly"],
    "householdinc": ["median_tot_hhd_inc_weekly", "median household income weekly"]
}

const Barchart = ({selection}) => {
    const [data1, setData1] = useState([]);
    const [fetched1, setFetched1] = useState(false);
    const chartRef1 = useRef();
    console.log(selection);
    useEffect(() => {
        async function fetchData() {
            const result = await fetch("http://172.26.128.201:30003/aurin/" + selection + "_sorted").then((response) => response.json())
            setData1(result);
            let top10 = [];
            var i = 0;
            for (const item of result) {
              if (i < 10) {
                top10[i] = {"suburbs": item["feature_n2"], "value": item[conversion[selection][0]]};
                i += 1;
              }
            }
            setData1(top10);
            setFetched1(true);
        }
        fetchData();
    }, []);

    const barRef1 = chartRef1.current;
    useEffect(() => {
        var myChart = new Chart(barRef1, {
            type: "bar",
            data: {
                datasets: [{
                    label: "value",
                    data: data1,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgb(54, 162, 235, 0.5)',
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
                        text: "Top10 suburbs for " + conversion[selection][1]
                    }
                }
            }
        });

        return () => {
            myChart.destroy()
            setFetched1(false)
        }

    }, [data1, fetched1]);

    return (
        <div style={{height: 250, width: 800, margin: '15px 200px'}}>
            <canvas id="myChart" ref={chartRef1} style={{height: 250, width: 800}}/>
        </div>
    )
};

export default Barchart;
