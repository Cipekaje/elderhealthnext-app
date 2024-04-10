import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

// Dynamic import of Chart component to be rendered client side
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartTile = ({ color, userId, isSidebarOpen }) => {
  // Function to get the days of the past week
  const getPastWeekDays = () => {
    const daysOfWeek = ['S', 'P', 'A', 'T', 'K', 'Pn', 'Š'];
    const currentDate = new Date();
    const pastWeekDays = [];

    //Fills the past days array
    for (let i = 8; i >= 0; i--) {
      const pastDate = new Date(currentDate);
      pastDate.setDate(currentDate.getDate() - i);
      const dayIndex = pastDate.getDay();
      pastWeekDays.push(daysOfWeek[dayIndex]);
    }

    return pastWeekDays;
  };

  const [series, setSeries] = useState([{ name: 'Vidutinis širdies ritmas (bpm)', data: [] }]);

  // Fetch data from the API endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/heartrateChart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        if (response.ok) {
          const data = await response.json();
          // Update series data with fetched data
          setSeries([{ name: 'Vidutinis širdies ritmas (bpm)', data: data }]);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userId]);

  // Options for the chart
  const options = {
    chart: {
      height: 350,
      width: '100%',
      type: 'line',
      toolbar: { show: false },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
    },
    colors: [color || '#008FFB'],
    title: {
      text: 'Širdies ritmas šią savaitę',
      align: 'center',
      style: { fontSize: '16px', fontWeight: 600, fontFamily: 'Arial, sans-serif', color: '#333' },
    },
    xaxis: {
      categories: getPastWeekDays(),
      labels: { style: { fontSize: '18px', fontWeight: 400, fontFamily: 'Arial, sans-serif', colors: '#666' } },
    },
    yaxis: {
      title: { text: 'Širdies ritmas (bpm)', style: { fontSize: '18px', fontWeight: 400, fontFamily: 'Arial, sans-serif', color: '#666' } },
      labels: { style: { fontSize: '16px', fontWeight: 400, fontFamily: 'Arial, sans-serif', colors: '#666' } },
    },
  };

  return (
    <div width={'100%'}>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          marginRight: '20px',
          width: '100%',
          height: '400px',
          overflow: 'hidden',
          verticalAlign: 'top',
        }}
      >
        <Chart options={options} series={series} type="line" height={350} width={'100%'} />
      </Box>
    </div>
  );
};

export default ChartTile;