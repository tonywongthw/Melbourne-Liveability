import React, { useRef, useState, useEffect } from "react";
import { Select } from 'antd';
import "antd/dist/antd.min.css";
import Barchart from "./barchart1";

const Chartpage = () => {
    const [selection1, setSelection1] = useState(null);
    const [barchart1, setBarchart1] = useState(null);
    const [selection2, setSelection2] = useState(null);
    const [barchart2, setBarchart2] = useState(null);

    function handleChange1(value) {
        console.log(value);
        if (value != "select value for chart1") {
            setBarchart1(true);
            setSelection1(value);
        }
    }
    function handleChange2(value) {
        console.log(value);
        setBarchart2(true);
        setSelection2(value);
    }

    return (
        <div>
            <Select defaultValue="select a chart1" style={{ width: 200 }} onChange={handleChange1}>
                <Option value="mortgage">mortgage monthly</Option>
                <Option value="rent">rent weekly</Option>
                <Option value="familyinc">family income weekly</Option>
                <Option value="personalinc">personal income weekly</Option>
                <Option value="householdinc">household income weekly</Option>
            </Select>
            <Select defaultValue="select a chart2" style={{ width: 200 }} onChange={handleChange2}>
                <Option value="mortgage">mortgage monthly</Option>
                <Option value="rent">rent weekly</Option>
                <Option value="familyinc">family income weekly</Option>
                <Option value="personalinc">personal income weekly</Option>
                <Option value="householdinc">household income weekly</Option>
            </Select>
            {barchart1 ? <Barchart selection={selection1}/> : <></>}
            {barchart2 ? <Barchart selection={selection2}/> : <></>}
        </div>
    )
};

export default Chartpage;