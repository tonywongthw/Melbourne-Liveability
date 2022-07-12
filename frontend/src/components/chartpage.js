import React, { useRef, useState, useEffect } from "react";
import { Select } from 'antd';
import "antd/dist/antd.min.css";
import Barchart from "./barchart";

const Chartpage = () => {
    const [selection1, setSelection1] = useState(null);
    const [barchart1, setBarchart1] = useState(null);
    const [selection2, setSelection2] = useState(null);
    const [barchart2, setBarchart2] = useState(null);

    function handleChange1(value) {
        if (value != "select value for chart1") {
            setBarchart1(true);
            setSelection1(value);
        }
    }
    function handleChange2(value) {
        setBarchart2(true);
        setSelection2(value);
    }

    return (
        <div style={{height: '100%', width: '100%'}}>
            <div style={{height: '50px', paddingTop: '-50'}}> <Select defaultValue="Select a Chart" style={{ width: 200 }} onChange={handleChange1}>
                <Option value="mortgage">Monthly Mortgage</Option>
                <Option value="rent">Weekly Rent</Option>
                <Option value="familyinc">Weekly Family Income</Option>
                <Option value="personalinc">Weekly Personal Income</Option>
                <Option value="householdinc">Weekly Household Income</Option>
                <Option value="crypto">Percentage of Positive Crypto Tweets</Option>
                <Option value="covid">Percentage of Positive Covid Tweets</Option>
                <Option value="election">Percentage of Positive Election Tweets</Option>
                <Option value="housing">Percentage of Positive Houseing Tweets</Option>
            </Select>
            <Select defaultValue="Select a Chart to Compare" style={{ width: 200 }} onChange={handleChange2}>
                <Option value="mortgage">Monthly Mortgage</Option>
                <Option value="rent">Weekly Rent</Option>
                <Option value="familyinc">Weekly Family Income</Option>
                <Option value="personalinc">Weekly Personal Income</Option>
                <Option value="householdinc">Weekly Household Income</Option>
                <Option value="crypto">Percentage of Positive Crypto Tweets</Option>
                <Option value="covid">Percentage of Positive Covid Tweets</Option>
                <Option value="election">Percentage of Positive Election Tweets</Option>
                <Option value="housing">Percentage of Positive Houseing Tweets</Option>
            </Select></div>
            {barchart1 ? <Barchart selection={selection1}/> : <></>}
            {barchart2 ? <Barchart selection={selection2}/> : <></>}
        </div>
    )
};

export default Chartpage;