import React, { useRef, useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import { getBackend } from "./util";

// set a conversion for selection and real-backend-ouptup key
const conversion = {
    "mortgage": ["median_mortgage_repay_monthly", "Median Monthly Mortage"],
    "rent": ["median_rent_weekly", "Median Weekly Rent"],
    "familyinc": ["median_tot_fam_inc_weekly", "Median Weekly Family Income"],
    "personalinc": ["median_tot_prsnl_inc_weekly", "Median Weekly Personal Income"],
    "householdinc": ["median_tot_hhd_inc_weekly", "Median Weekly Household Income"],
    "crypto": ["positive_percentage", "Percentage of Postive Crypto Tweets"],
    "covid": ["positive_percentage", "Percentage of Postive Covid Tweets"],
    "election": ["positive_percentage", "Percentage of Postive Election Tweets"],
    "housing": ["positive_percentage", "Percentage of Postive Housing Tweets"]
}

const Barchart = ({selection}) => {
    const [data1, setData1] = useState([]);
    const [fetched1, setFetched1] = useState(false);
    const chartRef1 = useRef();
    
    useEffect(() => {
        async function fetchData() {
            const backendIp = await getBackend()

            if (["crypto", "covid", "election", "housing"].includes(selection)) {
                const result1 = await fetch(`http://${backendIp}/testGetTopic/` + selection).then((response) => response.json());
                var endpos = 10;
                if (result1["features"].length < 10) {
                    endpos = result1["features"].length;
                }
                let top10 = [];
                for (var i = 0; i < endpos; i++) {
                    top10[i] = {"suburbs": result1["features"][i]["properties"]["feature_n2"], "value": result1["features"][i]["properties"]["positive_percent"]};
                }
                setData1(top10);
                setFetched1(true);
            }
            else {
                const result2 = await fetch(`http://${backendIp}/aurin/` + selection + "_sorted").then((response) => response.json());
                let top10 = [];
                for (var i = 0; i < 10; i++) {
                    top10[i] = {"suburbs": result2[i]["feature_n2"], "value": result2[i][conversion[selection][0]]};
                }
                setData1(top10);
                setFetched1(true);
            }
        }
        fetchData();
    }, [selection]);

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
                        text: "Top 10 Suburbs for " + conversion[selection][1]
                    }
                },
                responsive: false,
                maintainAspectRatio: false
            }
        });

        return () => {
            myChart.destroy()
            setFetched1(false)
        }

    }, [fetched1]);

    return (
        <div  style={{height: '50%', width: '100%'}}>
            <canvas className="chart" ref={chartRef1} height={window.innerHeight/2 - 100} width={window.innerWidth-100}/>
        </div>
    )
};

export default Barchart;