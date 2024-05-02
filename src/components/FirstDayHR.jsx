import React, { useState, useEffect, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const HeartrateAverageTile = (userid) => {

  const [Data, setDataArray] = useState([]);
  const [AvgFirstDayHR, setAvgFirstDayHR] = useState(null);
  const [AvgFirstMonthHR, setAvgFirstMonthHR] = useState(null);
  const [AvgFirstWeekHR, setAvgFirstWeekHR] = useState(null);
  const [error, setError] = useState(null);
  const [FindDate, setFindDate] = useState({
    FindDate: dayjs()
  });

  const userIdNumber = userid.userid; 
  //console.log(userIdNumber);
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
        const url = `/api/get/HR?userid=${JSON.stringify(userIdNumber)}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }else{
          const Data = await response.json();

          setAvgFirstDayHR(Data.result.averageHRFirstDay[0].averageHR);
          setAvgFirstWeekHR(Data.result.averageHRFirstWeek[0].averageHR);
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
    if(AvgFirstDayHR != null && AvgFirstMonthHR != null && AvgFirstWeekHR != null){
      handleUpdate();
    }
    

  });

  return (
    <div>
      <h5>Heart Rate Averages</h5>
      <div>
        <h8>First Day Average: {AvgFirstDayHR} bpm</h8><br></br>
        <h8>First Week Average: {AvgFirstWeekHR} bpm</h8><br></br>
        <h8>Frist Month Average: {AvgFirstMonthHR} bpm</h8><br></br>
      </div>
    </div>
  );
}

export default HeartrateAverageTile;
