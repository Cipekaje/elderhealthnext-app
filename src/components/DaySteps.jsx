import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Box, Typography, Grid } from '@mui/material';
import HeartIcon from '@mui/icons-material/MonitorHeart';

const HeartrateAverageTile = ({ color, userid }) => {
  const [HRSteps, setHRSteps] = useState(null);
  const [dataHR, setDataHR] = useState(null);
  const [HighHR, setHighHR] = useState(null);
  const [error, setError] = useState(null);

  const userIdNumber = userid;

  useEffect(() => {
    if (userIdNumber == null) {
      return;
    }

    const fetchData = async () => {
      try {
        const url = `/api/get/StepsHR?userid=${JSON.stringify(userIdNumber)}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        } else {
          const Data = await response.json();
          console.log('Fetched Data:', Data);

          if (Data.result.TodaySteps) {
            const stepsData = findHourWithHighestSteps(Data.result.TodaySteps);
            setHRSteps(stepsData);
            console.log('HRSteps:', stepsData);
          }

          if (Data.result.TodayHR) {
            const stepsHour = findHourWithHighestSteps(Data.result.TodaySteps);
            const hrData = findHRByHour(stepsHour, Data.result.TodayHR);
            
            setDataHR(hrData);
            setHighHR(findHourWithHighestHR(Data.result.TodayHR));
            console.log('dataHR:', hrData);
            console.log('HighHR:', findHourWithHighestHR(Data.result.TodayHR));
          }
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [userIdNumber]);

  function findHourWithHighestSteps(data) {
    let highestSteps = 0;
    let hourWithHighestSteps = null;

    data.forEach(entry => {
      const steps = parseInt(entry.Steps);
      if (steps > highestSteps) {
        highestSteps = steps;
        hourWithHighestSteps = entry.Hour;
      }
    });

    return [hourWithHighestSteps, highestSteps];
  }

  function findHourWithHighestHR(data) {
    let highestHR = 0;
    let hourWithHighestHR = null;

    data.forEach(entry => {
      const hr = entry.HR;
      if (hr > highestHR) {
        highestHR = hr;
        hourWithHighestHR = entry.Hour;
      }
    });

    return [hourWithHighestHR, highestHR];
  }

  function analyze(steps, hr) {
    if (steps > 3000 && hr < 160 && hr > 100) {
      return 'Normalus';
    } else if (steps < 3000 && steps > 1000 && hr < 120 && hr > 90) {
      return 'Normalus';
    } else if (steps < 1000 && hr < 100 && hr > 50) {
      return 'Normalus';
    } else if (hr < 50) {
      return 'Per Žemas';
    } else {
      return 'Per aukštas';
    }
  }

  function findHRByHour(stepData, hrData) {
    let HR = 0;
    let hour = null;

    hrData.forEach(entry => {
      const hr = parseInt(entry.HR);
      if (stepData[0] === entry.Hour) {
        HR = hr;
        hour = entry.Hour;
      }
    });

    return [hour, HR];
  }
  const renderRows = (stepsData, hrData, highHRData) => {
    if (!stepsData && !hrData) return 'Šiandiena aktyvaus periodo neturejote';
  
    const previousHour = (stepsData && (stepsData[0] + 1 + 24) % 24) || null;
    const previousHourHR = (hrData && (hrData[0] + 1 + 24) % 24) || null;
  
    if (stepsData && hrData) {
      if (stepsData[0] === hrData[0]) {
        return `Šiandiena tarp ${stepsData[0]}:00 ir ${previousHour}:00 nuėjote daugiausiai žingsnių: ${stepsData[1]}. Jūsų širdies ritmas tuo metu buvo: ${hrData[1]} (${analyze(stepsData[1], hrData[1])})`;
      } else {
        return `Šiandiena tarp ${stepsData[0]}:00 ir ${previousHour}:00 nuėjote daugiausiai žingsnių: ${stepsData[1]}. Jūsų širdies ritmas tuo metu buvo: neužfiksuotas`;
      }
    }
  
    if (stepsData) {
      return `Šiandiena tarp ${stepsData[0]}:00 ir ${previousHour}:00 nuėjote daugiausiai žingsnių: ${stepsData[1]}. Jūsų širdies ritmas tuo metu buvo: neužfiksuotas`;
    }
  
    if (hrData) {
      return `Šiandiena tarp ${hrData[0]}:00 ir ${previousHourHR}:00 užfiksuotas aukščiausias jūsų šios dienos širdies ritmas: ${highHRData[1]} (${analyze(0, highHRData[1])}). Žingsniai tuo laiku nesuskaičiuoti`;
    }
  
    return 'Šiandiena aktyvaus periodo neturejote';
  };
  
  

  return (
    <Box
      sx={{
        backgroundColor: color || 'white',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '20px',
        width: '100%',
        height: 'auto',
        display: 'inline-block',
        verticalAlign: 'top',
        flex: '1 0 auto',
      }}
    >
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#fff' }}>
            <HeartIcon sx={{ marginRight: '10px' }} />
            {renderRows(HRSteps, dataHR, HighHR)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeartrateAverageTile;
