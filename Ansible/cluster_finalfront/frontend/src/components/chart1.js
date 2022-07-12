import React from 'react';
import Chart from 'chart.js/auto';
import styled from "styled-components";

export class Chart1 extends React.Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const Chart1Ref = this.chartRef.current.getContext("2d");
        
        new Chart(Chart1Ref, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "population density (person/km^2)",
                        data: [{"sa3_name": "Brunswick - Coburg", "sa3_code": "20601", "yr": 2019, "population_density": 4878.4}, 
                        {"sa3_name": "Darebin - South", "sa3_code": "20602", "yr": 2019, "population_density": 4156.3}, 
                        {"sa3_name": "Melbourne City", "sa3_code": "20604", "yr": 2019, "population_density": 5690.0}, 
                        {"sa3_name": "Port Phillip", "sa3_code": "20605", "yr": 2019, "population_density": 4498.2}, 
                        {"sa3_name": "Yarra", "sa3_code": "20607", "yr": 2019, "population_density": 4959.8}, 
                        {"sa3_name": "Stonnington - West", "sa3_code": "20606", "yr": 2019, "population_density": 6040.3}, 
                        {"sa3_name": "Essendon", "sa3_code": "20603", "yr": 2019, "population_density": 4108.2}],
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
    }
    render() {
        return (
            <Container>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </Container>
        )
    }
}

const Container = styled.div`
    height: 100%;
    width: 100%;
`;
