import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DistanceStepsChart = ({ color, userId, isSidebarOpen }) => {
  const getPastWeekDays = () => {
    const daysOfWeek = ['S', 'P', 'A', 'T', 'K', 'Pn', 'Š'];
    const currentDate = new Date();
    const pastWeekDays = [];

    for (let i = 8; i >= 0; i--) {
      const pastDate = new Date(currentDate);
      pastDate.setDate(currentDate.getDate() - i);
      const dayIndex = pastDate.getDay();
      pastWeekDays.push(daysOfWeek[dayIndex]);
    }

    return pastWeekDays;
  };

  const [series, setSeries] = useState([
    { name: 'Atstumas (km)', data: [] },
    { name: 'Žingsniai', data: [] },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/distanceSteps', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        if (response.ok) {
          const data = await response.json();
          setSeries([
            { name: 'Nueitas atstumas (km)', data: data.distanceWalked },
            { name: 'Žingsniai', data: data.stepsMade },
          ]);
        } else {
          console.error('Nepavyko paimti duomenų:', response.statusText);
        }
      } catch (error) {
        console.error('Klaida paimant duomenis:', error);
      }
    };
    fetchData();
  }, [userId]);

  const options = {
    chart: {
      height: '100%',
      width: '100%',
      type: 'line',
      toolbar: { show: false },
      zoom: {
        enabled: false
      },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
    },
    colors: [color || '#008FFB', '#FF5733'],
    title: {
      text: 'Veiklos stebėjimas šią savaitę',
      align: 'center',
      style: { fontSize: '16px', fontWeight: 600, fontFamily: 'Arial, sans-serif', color: '#333' },
    },
    xaxis: {
      categories: getPastWeekDays(),
      labels: { style: { fontSize: '12px', fontWeight: 400, fontFamily: 'Arial, sans-serif', color: '#666' } },
    },
    yaxis: [
      {
        title: { text: 'Nueitas atstumas (km)', style: { fontSize: '14px', fontWeight: 400, fontFamily: 'Arial, sans-serif', color: '#666' } },
        labels: { style: { fontSize: '12px', fontWeight: 400, fontFamily: 'Arial, sans-serif', color: '#666' } },
        min: 0,
      },
      {
        opposite: true,
        title: { text: 'Žingsniai', style: { fontSize: '14px', fontWeight: 400, fontFamily: 'Arial, sans-serif', color: '#666' } },
        labels: { style: { fontSize: '12px', fontWeight: 400, fontFamily: 'Arial, sans-serif', color: '#666' } },
        min: 0,
      },
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 280,
          },
          title: {
            style: { fontSize: '12px' },
          },
          xaxis: {
            labels: { style: { fontSize: '10px' } },
          },
          yaxis: [
            {
              title: { style: { fontSize: '10px' } },
              labels: { style: { fontSize: '10px' } },
            },
            {
              opposite: true,
              title: { style: { fontSize: '10px' } },
              labels: { style: { fontSize: '10px' } },
            },
          ],
        },
      },
    ],
  };

  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: { xs: '10px', sm: '20px', md: '30px' },
          marginBottom: '20px',
          marginRight: '20px',
          width: '100%',
          height: { xs: '300px', sm: '350px', md: '400px' },
          overflow: 'hidden',
          verticalAlign: 'top',
        }}
      >
        <Chart options={options} series={series} type="line" height="100%" width="100%" />
      </Box>
    </div>
  );
};

export default DistanceStepsChart;
