import React, { useState, useEffect, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Typography, Button, Grid } from '@mui/material';
import HeartIcon from '@mui/icons-material/MonitorHeart';


const HeartrateAverageTile = ({color, userid}) => {

  const [Datasa, setDataArray] = useState([]);
  const [HRSteps, setHRSteps] = useState([]);
  const [dataHR, setdataHR] = useState([]);
  const [HighHR, setHighHR] = useState([]);
  const [AvgFirstDayHR, setAvgFirstDayHR] = useState(null);
  const [AvgFirstMonthHR, setAvgFirstMonthHR] = useState(null);
  const [AvgFirstWeekHR, setAvgFirstWeekHR] = useState(null);
  const [error, setError] = useState(null);
  const [FindDate, setFindDate] = useState({
    FindDate: dayjs()
  });
  const tileWidth = '100%';
  const tileHeight = 'auto';

  

  const userIdNumber = userid; 
  //console.log(userIdNumber);
  useEffect(() => {

    if (userIdNumber == null) {
      return
    }
    
    //const userIdNumber = parseInt(userid.userid, 10); console.log(userIdNumber);
    const fetchData = async () => {
      try {
        //const NewDate = FormatDate(FindDate); // Assuming FindDate is defined somewhere
        const url = `/api/get/StepsHR?userid=${JSON.stringify(userIdNumber)}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }else{
          const Data = await response.json();

          //setAvgFirstDayHR(Data.result.averageHRFirstDay[0].averageHR);
          //setAvgFirstWeekHR(Data.result.averageHRFirstWeek[0].averageHR);
          setDataArray(Data.result.TodaySteps);

          console.log(Data.result.TodayHR);
          if( Data.result.TodaySteps){
            setHRSteps(findHourWithHighestSteps(Data.result.TodaySteps));
          }
          if( Data.result.TodayHR){
            setdataHR(findHRByHour( HRSteps , Data.result.TodayHR));
            setHighHR(findHourWithHighestHR(Data.result.TodayHR));
          }

          console.log(HighHR);
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
  function convert24h(time){
    if(time == 0){
      
    }
  }


  function findHourWithHighestHR(data) {
    let highestSteps = 0;
    let hourWithHighestSteps = null;

    data.forEach(entry => {
        const steps = entry.HR;
        if (steps > highestSteps) {
            highestSteps = steps;
            hourWithHighestSteps = entry.Hour;
        }
    });

    return [hourWithHighestSteps, highestSteps];
  }

  function analyze(steps, hr){
    if (steps > 3000 && hr < 160 && hr > 100){
      return "Normalus";

    }
    else if(steps < 3000 && steps > 1000 && hr < 120 && hr > 90){
      return "Normalus";
    }
    else if(steps < 1000 && hr < 100 && hr > 50){
        return "Normalus";
    }
    else if(hr < 50){
      return "Per Žemas";
    }
    else{
      return "Per aukštas";
    }

    
  }
  
  function findHRByHour( datsa , data) {
    let HR = 0;
    let hour = null;

    data.forEach(entry => {
        const hr = parseInt(entry.HR);
        if (datsa[0] == data.Hour) {
            HR = hr;
            hour = entry.Hour;
        }
    });

    return [hour, HR];
  }

  const renderRows = (datas, datahr, HighHR) => {
    const previousHour = (datas[0] + 1 + 24) % 24;
    const previousHourhr = (datahr[0] + 1 + 24) % 24;

    if(datas[0] != null &&  datas[1] != null && datahr[1] != null && (datas[0] == datahr[0])){
      return "Šiandiena tarp " + datas[0] + ":00 ir " + (previousHour) + ":00 nuėjote daugiausiai žingsnių: " + datas[1] + ". Jūsų širdies ritmas tuo metu buvo: " + datahr[1] + "("+ analyze(datas[1], datahr[1]) +")";
    }
    else if(datas[0] != null &&  datas[1] != null){
      return "Šiandiena tarp " + datas[0] + ":00 ir " + (previousHour) + ":00 nuėjote daugiausiai žingsnių: " + datas[1] + ". Jūsų širdies ritmas tuo metu buvo: neužfiksuotas" ;
    }
    else if(datahr[1] != null && datahr[0] != null && datas[0] == null ||  datas[1] == null){
      return "Šiandiena tarp " + datahr[0] + ":00 ir " + (previousHourhr) + ":00 užfiksuotas aukščiausias jūsų šios dienos širdies ritmas: " + HighHR[1] + "("+ analyze(datas[1], HighHR[1]) +") Žingsniai tuo laiku nesuskaičiuoti";
    }
      
    
  }
  

  return (
    <Box
    sx={{
        backgroundColor: color || 'white',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '20px',
       
        width: tileWidth,
        height: tileHeight,
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
                <Typography variant="subtitle" sx={{ color: '#fff', fontWeight: 'bold', marginLeft: '20px' }}>
                   
                </Typography>
            </Typography>
        </Grid>
    </Grid>
  </Box>  
  );
}

export default HeartrateAverageTile;
