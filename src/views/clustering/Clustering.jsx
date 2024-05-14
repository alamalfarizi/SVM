import React from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

const Clustering = () => {
  const chartData = {
    options: {
      chart: {
        height: 350,
        type: 'bubble'
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1
      },

      xaxis: {
        tickAmount: 5,
        type: 'category'
      },
      yaxis: {
        max: 5
      }
    },
    series: [
      {
        name: 'Tinggi',
        data: [
          [4, 3, 2],
          [2, 3, 4],
         
        ]
      },
      {
        name: 'Sedang',
        data: [
          [3, 3, 3],
          [1, 1, 3],
      
        ]
      },
      {
        name: 'Rendah',
        data: [
          [4, 2, 4],
          [2, 2, 3],
        
        ]
      }
    ]
  };
  return (
    <MainCard title="Clustering" isGoBack={true}>
      <Box>
        <ReactApexChart type="bubble" height={350} series={chartData.series} options={chartData.options} />
      </Box>
    </MainCard>
  );
};

export default Clustering;
