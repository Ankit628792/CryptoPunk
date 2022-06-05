import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import Loader from './Loader';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


const TwoLineChart = ({ coinHistory, currentPrice, coinName, predictionData }) => {
    let chartLabel = [];
    let chartData = [];
    let predictedData = []

    if (!coinHistory) return <Loader />
    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        chartData.push(coinHistory?.data?.history[i]?.price)
    }
    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        chartLabel.push(new Date(coinHistory?.data?.history[i]?.timestamp * 1000).toLocaleDateString())
    }

    if (chartLabel.length && chartData.length && predictionData) {
        chartLabel = chartLabel.reverse()
        for (let i = 1; i < predictionData.length; i = i + 3) {
            chartLabel.push(new Date(predictionData[i - 1]).toLocaleDateString())
            predictedData.push(parseFloat(predictionData[i]))
        }
    }


    const options = {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: true,
                    color: 'rgba(0,0,0,0.1)',
                },
            }
        }
    };

    chartData = chartData.reverse().slice(chartData.length - 40, chartData.length)
    chartLabel = chartLabel.slice(chartLabel.length - 50, chartLabel.length)

    const data = {
        labels: chartLabel,
        datasets: [
            {
                label: 'Previous Value',
                data: chartData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Future value',
                data: [...chartData, ...predictedData],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }


    return (
        <>
            <Row className="flex gap-x-5 items-center justify-between">
                <h1 className="text-xl lg:text-2xl 2xl:text-3xl font-medium text-center flex-1 sm:text-left">{coinName} Prediction Chart </h1>
                <Col className="flex items-center gap-x-10 text-lg lg:text-xl font-medium">
                    {/* <h1>Change: <span className={`${coinHistory?.data?.change < 0 ? 'text-red-400' : 'text-green-400'}`}> {coinHistory?.data?.change}% </span></h1> */}
                    <h1>Current {coinName} Price: <span className='text-yellow-400'>$ {currentPrice}</span></h1>
                </Col>
            </Row>
            <div className='graph__shadow'>
                <Line data={data} options={options} />
            </div>
        </>
    );
};

export default TwoLineChart;
