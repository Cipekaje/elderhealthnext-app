import React, { useState, useEffect, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Typography, Button, Grid } from '@mui/material';
import HeartIcon from '@mui/icons-material/MonitorHeart';


const HeartrateAverageTile = ({ color, userid, }) => {

  const [Data, setDataArray] = useState([]);
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
  // console.log("ar yra",userIdNumber);
  useEffect(() => {

    if (userIdNumber == null) {
      return
    }
    const handleUpdate = async () => {
      //console.log(AvgFirstDayHR);
      const user = { AvgFirstDayHR, AvgFirstWeekHR, AvgFirstMonthHR, userIdNumber };
      //console.log(user);
      if (user) {
        const response = await fetch('/api/post/HRput', {
          method: "PUT",
          body: JSON.stringify(user)
        });

        if (response.ok) {
          // Handle success
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Update failed!');
        }
      }
      setError(null);
    };

    //const userIdNumber = parseInt(userid.userid, 10); console.log(userIdNumber);
    const fetchData = async () => {
      try {
        //const NewDate = FormatDate(FindDate); // Assuming FindDate is defined somewhere
        const url = `/api/get/HR?userid=${JSON.stringify(userIdNumber)}&usermonth=${JSON.stringify(AvgFirstMonthHR)}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        } else {
          const Data = await response.json();

          //setAvgFirstDayHR(Data.result.averageHRFirstDay[0].averageHR);
          //setAvgFirstWeekHR(Data.result.averageHRFirstWeek[0].averageHR);
          setAvgFirstMonthHR(Data.result.averageHRFirstMonth[0].averageHR);

          //console.log(Data.result);
          setError(null);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
    // if (AvgFirstMonthHR != null) {
    //   handleUpdate();
    // }


  }, [userIdNumber]);
  // }, [userIdNumber, AvgFirstMonthHR]);

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
            <HeartIcon sx={{ marginRight: '10px' }} /> Jūsų stabilus širdies ritmas turėtų būti:
            <Typography variant="subtitle" sx={{ color: '#fff', fontWeight: 'bold', marginLeft: '20px' }}>
              {AvgFirstMonthHR} bpm.
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeartrateAverageTile;
