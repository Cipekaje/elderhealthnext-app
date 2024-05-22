import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { createTheme, styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Button, CssBaseline, Divider, Grid, Stack, TextareaAutosize, ThemeProvider, responsiveFontSizes, useMediaQuery } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// project imports
import { Breadcrumbs } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Tile from '../components/Tile';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import router from 'next/router';
import { DateField, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import './styles.css';
import { DataGrid } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import Emoji from '../components/Emoji';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import FirstDayHR from '../components/FirstDayHR';

let theme = createTheme();
theme = responsiveFontSizes(theme);



const buttonWidth = '20%';
const buttonHeight = '3rem';
// styles
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme'
})(({ theme, open }) => ({
  ...theme.typography,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: open ? '310px' : '15px', // Adjust margin left when sidebar is open or closed
  width: open ? 'calc(100% - 310px)' : 'calc(100% - 15px)', // Adjust width when sidebar is open or closed
  padding: '22px',
}));

const MainContentWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#DCDCDC',
  borderRadius: '30px',
  // Remove overflow: 'hidden' if you want the wrapper to expand with its content
  // overflow: 'hidden',
  marginTop: '70px',
  height: '100vh + 20px',
  // Add border for visualization purposes
  //border: '2px solid red', // or any color you prefer
}));

const GridEmoji = styled(Grid)(({ theme }) => ({
  backgroundColor: '#DCDCDC',
  borderRadius: '8px',
  height: '50px',
  width: '50px',
  marginLeft: '20px',
  marginTop: '15px'
  

}));







// ==============================|| MAIN DASHBOARD LAYOUT ||============================== //

const UserJournalLayout = () => {
  const theme = useTheme();
 
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [buttonValue, setButtonValue] = useState(" ");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  

  const setSelectedEmojiValue = (severityLevel) => { // Explicitly type 'date' parameter
    if (severityLevel) {
      //const formattedDate = date.format('YYYY-MM-DD'); // Format the date
      setJournal({
        ...Journal,
        severity: severityLevel
      });
    }
  };

  // const { data: session } = useSession();
  // const user = session?.user;
  // const userID = session?.user?.id;

  const [userID, setUserID] = useState(null);
  const { data: session } = useSession();
  useEffect(() => {
    // Check if session data is available
    if (session && session.user && session.user.id) {
      setUserID(session.user.id);
    }
  }, [session]);


  const [error, setError] = useState(null);
  //const [error1, setError1] = useState(null);

  const [activeBox, setActiveBox] = useState(1);


  const [Journal, setJournal] = useState({
    symptom: '',
    description: '',
    date: dayjs(),
    severity: 0,
    

  });


  // Toggle function for sidebar
  const handleLeftDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleSymptomClick = (value) => {
    setShowTextarea(true);
    setShowOverlay(true);
    setButtonValue(value);
    setJournal({ ...Journal, symptom: value });

  };
  const handleClosePopup = () => {
    setShowTextarea(false);
    setShowOverlay(false);
  };

  const handleDateChange = (tdate) => { // Explicitly type 'date' parameter
    if (tdate) {
      //const formattedDate = date.format('YYYY-MM-DD'); // Format the date
      setJournal({
        ...Journal,
        date: tdate
      });
    }
  };

  const [FindDate, setFindDate] = useState({
    FindDate: dayjs()
  });

  // const handleuserID = (userID) => { // Explicitly type 'date' parameter
  //   if (userID) {
  //     setJournal({
  //       ...Journal,
  //       userid: userID
  //     });
  //   }
  // };


  const handleApzvalgaDateChange = (tdate) => { // Explicitly type 'date' parameter
    if (tdate) {
      setFindDate({
        FindDate: tdate 
      });
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding padding if month is single digit
    const day = String(date.getDate()).padStart(2, '0'); // Adding padding if day is single digit
    return `${year}-${month}-${day}`;
  }


  const handleToggle = (boxNumber) => {
    setActiveBox(boxNumber);
    handleFindClick();
  };

  const handleTextareaChange = (event) => {
    if (event) {
      setJournal({ ...Journal, description: event.target.value });
    }
  };

  const handleTextareaNull = (NewText) => {
    setJournal({ ...Journal, description: NewText });
  };




  const handleSubmit = async (event, userID1) => {
    event.preventDefault(); // Prevent default form submission\
  
    // Wait for the userID state to update
    console.log(userID1);

    const NewText = '';
    if (!Journal.symptom || !Journal.severity || !userID1) {
      return;
    } else {
      //window.location.reload();
      alert('Duomenys išsaugoti!');
    }
    
    
    console.log(Journal);
    handleTextareaNull(NewText);

    if (Journal && userID1) {
      const response = await fetch('/api/auth/Journal', {
        method: "POST",
        body: JSON.stringify({Journal, userid: userID1})
      });

      if (response.ok) {
        // Handle success response
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Duomenys neišsaugoti!');
      }
    }

    setError(null);
    setJournal({
      ...Journal,
      symptom: '',
      description: '',
      date: null,
      severity: 0
    });

  };

  const [clicked, setclicked] = useState(false);
  const [Selected, setSelected] = useState(false);
  const [DataArray, setDataArray] = useState([]);

  const handleFindClick = async () => {
    setSelected(false);
    try {
      //const NewDate = FormatDate(FindDate); // Assuming FindDate is defined somewhere
      const url = `/api/get/Journal?FindDate=${JSON.stringify(FindDate.FindDate)}&userid=${JSON.stringify(userID)}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);
      const newDataArray = Object.values(data.result).map(obj => [obj.date, obj.symptom, obj.severity, obj.description]);
      console.log(newDataArray);

      setDataArray(newDataArray);
      if (newDataArray.length > 0) {
        setclicked(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error gracefully, show a message to the user, etc.
    }
  }


  const [DataArrayByDate, setDataByDateArray] = useState([]);
  const handleFindByDateClick = async () => {
    setSelected(true);
    setclicked(false);
    formatDate(FindDate.FindDate);
    try {
      //const NewDate = FormatDate(FindDate); // Assuming FindDate is defined somewhere
      const url = `/api/get/ByDate?FindDate=${JSON.stringify(FindDate.FindDate)}&userid=${JSON.stringify(userID)}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      const newDataArray = Object.values(data.result).map(obj => [obj.date, obj.symptom, obj.severity, obj.description]);
      console.log(newDataArray);

      setDataByDateArray(newDataArray);
      if (newDataArray.length > 0) {
        setSelected(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error gracefully, show a message to the user, etc.
    }
  }
  


  // Effect to add event listener on mount and remove it on unmount
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleClosePopup();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  

  const renderCellContent = (cell, cellIndex) => {
    // Check if the cell is in the "Simptomo stiprumas" column
    if (cellIndex === 2) {
      // Check the value of "Simptomo stiprumas"
      if (cell === 5) {
        // Render emoji and label for very strongly
        return {
          icon: <SentimentVeryDissatisfiedIcon color="error" />,
          label: 'Labai stipriai',
        };
      } else if (cell === 4) {
        // Render emoji and label for strongly
        return {
          icon: <SentimentDissatisfiedIcon color="warning" />,
          label: 'Stipriai',
        };
      } else if (cell === 3) {
        // Render emoji and label for moderately
        return {
          icon: <SentimentNeutralIcon style={{color: '#ffea00'}} />,
          label: 'Vidutiniškai',
        };
      } else if (cell === 2) {
        // Render emoji and label for weakly
        return {
          icon: <SentimentSatisfiedIcon style={{ color: '#aed581' }} />,
          label: 'Silpnai',
        };
      } else if (cell === 1) {
        // Render emoji and label for very weakly
        return {
          icon: <SentimentSatisfiedAltIcon color="success" />,
          label: 'Labai silpnai',
        };
      } else {
        // Render label for other cases
        return {
          label: 'N/A',
        };
      }
    } else {
      // Render other cells normally
      return cell;
    }
  };
  
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const renderRows = (data) => {
    return data.map((row, index) => (
      <TableRow key={index}>
        {row.map((cell, cellIndex) => (
          <TableCell style={{ fontSize: isSmallScreen ? '8px' : '14px' }} key={cellIndex}>
            {/* Check if the cell is in the "Simptomo stiprumas" column */}
            {cellIndex === 2 ? (
              // Render emoji and label if provided
              renderCellContent(cell, cellIndex).icon && (
                <div style={{ fontSize: isSmallScreen ? '8px' : '14px' }}>
                  {renderCellContent(cell, cellIndex).icon}
                  <br></br>
                  {renderCellContent(cell, cellIndex).label}
                </div>
                
              )
            ) : (
              // Render other cells normally
              cell
            )}
          </TableCell>
        ))}
      </TableRow>
    ));
  };


  const ArrayToTable = ({ data }) => {
    for (let i = 0; i < data.length; i++) {
      data[i][0] = formatDate(data[i][0]);
    }
  
    
    if (data.length < 1) {
      return (
        <Table style={{ position: 'relative' , width: '100%'}}>
          <TableHead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#82b1ff' }}>
            <TableRow>
              <TableCell style={{ width: '30%', fontSize: isSmallScreen ? '8px' : '14px' }}>Data</TableCell>
              <TableCell style={{ fontSize: isSmallScreen ? '8px' : '14px' }}>Simptomas</TableCell>
              <TableCell style={{ fontSize: isSmallScreen ? '8px' : '14px' }}>Simptomo stiprumas</TableCell>
              <TableCell style={{ fontSize: isSmallScreen ? '8px' : '14px' }}>Aprašymas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ marginTop: '40px' }}>
            <h4>Įrašų nėra</h4>
          </TableBody>
        </Table>
      );
    } else {
      return (
        <Table style={{ position: 'relative',width: '100%' }}>
          <TableHead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#82b1ff' }}>
            <TableRow>
              <TableCell style={{ width: '30%', fontSize: isSmallScreen ? '8px' : '14px' }}>Data</TableCell>
              <TableCell style={{ fontSize: isSmallScreen ? '8px' : '14px' }}>Simptomas</TableCell>
              <TableCell style={{ fontSize: isSmallScreen ? '8px' : '14px' }}>Simptomo stiprumas</TableCell>
              <TableCell style={{ fontSize: isSmallScreen ? '8px' : '14px' }}>Aprašymas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ marginTop: '40px' }}>
            {renderRows(data)}
          </TableBody>
        </Table>
      );
    }
  };
  
  // Render function or JSX
const renderData = () => {
  if (clicked) {
    return <ArrayToTable data={DataArray} />;
  } else if(Selected){
    return <ArrayToTable data={DataArrayByDate} />;
  }
};

  
  const handleDeleteclick = async () => {
    handleFindClick();
  };

  

  


  //const DataArray = dataArray.map(obj => [obj.date, obj.symptom.toLowerCase(), obj.description]);

  return (
    <Box sx={{ position: 'relative' }}>

      <Box>

        <CssBaseline />

        {/* Overlay */}
        {showOverlay && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay
              zIndex: 9999, // Ensure it appears above other content
            }}

          />

        )}


        {/* header */}
        <AppBar enableColorOnDark color="inherit" elevation={0}>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </AppBar>

        <Sidebar drawerOpen={drawerOpen} drawerToggle={handleLeftDrawerToggle} />
        {activeBox === 1 && (
          <Main open={drawerOpen}>
            {/* breadcrumb */}

            <MainContentWrapper >

              <Breadcrumbs />

              <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Grid item className='GridEmoji'>
                  <Button variant="contained" onClick={() => handleToggle(1)}>Dienoraštis</Button>
                </Grid>
                <Grid item >
                  <Divider orientation="vertical" />
                </Grid>
                <Grid item>
                  <Button variant="outlined" onClick={() => handleToggle(2)}>Apžvalga</Button>
                </Grid>

              </Grid>


              {/* Grid container for arranging tiles */}
              {/* Grid container for arranging tiles */}
              <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '30px', marginBottom: '50px' }}>
                <h5>Pasirinkite jums būdingą simptomą</h5>


              </Grid>

              <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">


                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem', paddingLeft: '8px' }}
                  onClick={() => handleSymptomClick("Galvos skausmas")}

                >
                  <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Galvos skausmas
                  </Typography>
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem', paddingLeft: '11px' }}
                  onClick={() => handleSymptomClick("Pilvo pūtimas")}
                >
                  <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Pilvo pūtimas
                  </Typography>

                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem', paddingLeft: '8px' }}
                  onClick={() => handleSymptomClick("Svaigimas")}
                >
                  <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Svaigimas
                  </Typography>

                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem', paddingLeft: '8px' }}
                  onClick={() => handleSymptomClick("Pykinimas")}
                >
                  <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Pykinimas
                  </Typography>

                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem', paddingLeft: '8px' }}
                  onClick={() => handleSymptomClick("Vėmimas")}
                >
                  <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Vėmimas
                  </Typography>

                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem', paddingLeft: '10px' }}
                  onClick={() => handleSymptomClick("Gerklės skausmas")}
                >
                  <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Gerklės skausmas
                  </Typography>

                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem', paddingLeft: '8px' }}
                  onClick={() => handleSymptomClick("Skausmas")}
                >
                  <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Skausmas
                  </Typography>

                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem', paddingLeft: '11px' }}
                  onClick={() => handleSymptomClick("Bėrimas")}
                >
                  <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Bėrimas
                  </Typography>

                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem', marginBottom: '50px', paddingLeft: '8px' }}
                  onClick={() => handleSymptomClick("Aukštas spaudimas")}
                >
                  <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Aukštas spaudimas
                  </Typography>

                </Button>

                
              </Grid>
              

            </MainContentWrapper>




          </Main>
        )}
        {activeBox === 2 && (
          <Main open={drawerOpen}>
            {/* breadcrumb */}

            <MainContentWrapper>

              <Breadcrumbs />

              <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center', marginTop: '20px' }}>
                <Grid item>
                  <Button variant="outlined" onClick={() => handleToggle(1)}>Dienoraštis</Button>
                </Grid>
                <Grid item>
                  <Divider orientation="vertical" />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={() => handleToggle(2)}>Apžvalga</Button>
                </Grid>

              </Grid>


              {/* Grid container for arranging tiles */}
              {/* Grid container for arranging tiles */}
              <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '30px', marginBottom: '50px' }}>


              </Grid>

              <Grid container direction="column" alignItems="center" justifyContent="center" spacing={{ xs: 1, sm: 2, md: 3 }}>
                <ThemeProvider theme={theme}>

                  <Grid item sx={{}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker
                        sx={{ backgroundColor: 'white', borderRadius: '6px', marginRight: '20px', }}
                        label="Pasirinkite datą"
                        value={FindDate.FindDate}
                        format="YYYY-MM-DD"
                        defaultValue={dayjs()}

                        onChange={handleApzvalgaDateChange}
                        slotProps={{ textField: { required: true } }}
                      />
                    </LocalizationProvider>

                  </Grid>
                  {/* {userID} */}
                  <Grid item>
                    <Button variant="contained" color="success"style={{ marginRight: '20px' }} onClick={handleFindByDateClick}>Ieškoti pagal datą</Button>
                    <Button variant="contained"  onClick={handleDeleteclick}>Atstatyti</Button>
                  </Grid>

                  <Grid item xs={12} style={{ justifyContent: 'center', marginBottom: '50px' }}>
                    <Box
                      sx={{
                        

                        
                        borderRadius: 2,
                        backgroundColor: 'white',
                        padding: '20px',
                        border: '2px solid grey',
                        textAlign: 'center',
                        width: '700px',
                        paddingTop: '0px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        marginLeft: '0px',
                        height: '332px',
                        overflow: 'auto', // or overflow: 'hidden'
                        '@media (max-width: 800px)': { // Adjust the max-width as needed
                          width: 'auto', // Change the width for smaller screens
                          height: '300px',
                           // Let the height adjust automatically
                        }
                      }}
                    >
                      {renderData()}
                    </Box>


                  </Grid>
                </ThemeProvider>
              </Grid>

            </MainContentWrapper>




          </Main>

        )}

        {showTextarea && (
          <Box
            component="form"
            noValidate
            onSubmit={(event) => handleSubmit(event, userID)}
            ref={wrapperRef}
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: 2,
              // Set a high z-index value to make it appear on top
              backgroundColor: 'white',
              padding: '20px',
              border: '2px solid grey',
              textAlign: 'center',
              width: '500px',
              height: '500px',
              zIndex: 10000,
              '@media (max-width: 600px)': { // Adjust the max-width as needed
                width: '90%', // Change the width for smaller screens
                height: 'auto' // Let the height adjust automatically
              }
            }}
            alignItems="center" justifyContent="center"
          >
            {buttonValue}
            
            <br></br>
            <br></br>
            <Box sx={{ zIndex: 10001 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Box className='date-picker-popper'>
                  <DateField

                    label={"Parašykite datą"}
                    value={Journal.date}
                    format="YYYY-MM-DD"
                    defaultValue={dayjs()}
                    onChange={handleDateChange}
                  />
                </Box>
              </LocalizationProvider>
            </Box>
            <br></br>
            <Box sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative'}}>
              Pasirinkite, kaip stipriai jaučiate simptomą
              <br></br>

              <Emoji onSelect={setSelectedEmojiValue}></Emoji>
              
              <Grid container direction="row"  justifyContent="center" display="flex" spacing={{ xs: 1, sm: 2, md: 3 }}>

              </Grid>
            </Box>
            
            <Box sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', top: '20px', maxWidth: '600px',}}>
              <TextareaAutosize
                style={{ width: '100%', resize: 'none', borderWidth: '2px'}}
                minRows={6}
                placeholder="Trumpas komentaras apie simptomą"
                value={Journal.description}
                onChange={handleTextareaChange}
              />
            </Box>
            <Box alignItems="center" justifyContent="center" sx={{ justifyContent: 'center', marginTop: '30px' }}>
              <Button variant="contained" type="submit">
                Išsaugoti
              </Button>
            </Box>
          </Box>

        )}
      </Box>
      <Box>

      </Box>

    </Box>



  );
};

export default UserJournalLayout;

