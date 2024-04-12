import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { createTheme, styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Button, CssBaseline, Divider, Grid, Stack, TextareaAutosize, ThemeProvider, responsiveFontSizes, useMediaQuery } from '@mui/material';

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

let theme = createTheme();
theme = responsiveFontSizes(theme);

interface MainProps {
    open: boolean;
  }

interface Journal {
    symptom: string;
    description: string;  
    date: Dayjs | null;

  }
interface FindDate {

    FindDate: Dayjs | null;

  }
  



const buttonWidth = '20%';
const buttonHeight = '3rem';
// styles
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme'
})<MainProps>(({ theme, open }) => ({
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


const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 55,
  },
  {
    field: 'Date',
    headerName: 'Date',
    width: 110,
    editable: true,
  },
  {
    field: 'Symptom',
    headerName: 'Symptom',
    width: 150,
    editable: true,
  },
  {
    field: 'Description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },

];
const rows = [
  { id: 1, Date: 20, Symptom: 'Jon',      Description: 'Snow' },
  { id: 2, Date: 20, Symptom: 'Cersei',   Description: 'Lannister' },
  { id: 3, Date: 22, Symptom: 'Jaime',    Description: 'Lannister' },

];




// ==============================|| MAIN DASHBOARD LAYOUT ||============================== //

const UserJournalLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [buttonValue, setButtonValue] = useState(" ");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);


  const [error, setError] = useState<string | null>(null);
  const [error1, setError1] = useState<string | null>(null);
  
  const [activeBox, setActiveBox] = useState(1);


  const [Journal, setJournal] = useState<Journal>({
    symptom: '',
    description: '',
    date: dayjs(),
    
  });
  

  // Toggle function for sidebar
  const handleLeftDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleSymptomClick = (value: string) => {
    setShowTextarea(true);
    setShowOverlay(true);
    setButtonValue(value);
    setJournal({ ...Journal, symptom: value });
    
  };
  const handleClosePopup = () => {
    setShowTextarea(false);
    setShowOverlay(false);
  };

  const handleDateChange = (tdate: Dayjs | null) => { // Explicitly type 'date' parameter
    if (tdate) {
      //const formattedDate = date.format('YYYY-MM-DD'); // Format the date
      setJournal({
        ...Journal,
        date: tdate
      });
    }
  };

  const [FindDate, setFindDate] = useState<FindDate>({
    FindDate: dayjs()
  });
  const handleApzvalgaDateChange = (tdate: Dayjs | null) => { // Explicitly type 'date' parameter
    if (tdate) {
      setFindDate({
        ...FindDate,
        FindDate: tdate
      });
    }
  };



  const fetchData = async () => {
    try {
        // Make a GET request to your API endpoint
        const response = await fetch('/api/auth/Journal', {
          method: "GET",
        }) // Replace 'your-endpoint' with your actual endpoint
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch journals');
        }

        // Extract JSON data from the response
        const data = await response.json();

        // Extract the journals from the response data
        const { journals } = data;

        // Set the fetched journals in state
        setJournal(journals);
    } catch (error) {
        console.error('Failed to fetch journals:', error);
    }
  }

  const handleFindClick = () => {
    if (!FindDate) {
      return;
    } else {
      fetch('/api/auth/Journal', {
        method: 'GET', // or 'PUT', 'GET', 'DELETE', etc. depending on your backend API
        headers: {
          'Content-Type': 'application/json'
          // You may need to include additional headers depending on your backend requirements
        },
        body: JSON.stringify(FindDate) // Assuming FindDate is a variable containing the data you want to send
      })
      .then(response => {
        // Handle response
        console.log(response);
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });

      fetchData();
    }
  };
  

  const handleToggle = (boxNumber: any) => {
    setActiveBox(boxNumber);
  };

  const handleTextareaChange = (event: any) => {
    if (event) {
      setJournal({ ...Journal, description: event.target.value });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if ( !Journal.symptom || !Journal.description) {
      return;
    }
    else{
      
      window.location.reload();
      alert('Duomenys išsaugoti!');
    }

    console.log(Journal);

  



    if (Journal) {
      const response = await fetch('/api/auth/Journal', {
        method: "POST",
        body: JSON.stringify(Journal)
        
      });
      
      if (response.ok) {
        
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
      
    });
    
    
    
  };



 
  


  // Effect to add event listener on mount and remove it on unmount
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
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

          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" sx={{ textAlign: 'center',  marginTop: '20px'}}>
            <Grid item>
              <Button variant="contained" onClick={() => handleToggle(1)}>Dienoraštis</Button>
            </Grid>
            <Grid item >
              <Divider orientation="vertical"/>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={() => handleToggle(2)}>Apžvalga</Button> 
            </Grid>
                       
          </Grid>


          {/* Grid container for arranging tiles */}
          {/* Grid container for arranging tiles */}
          <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '30px', marginBottom: '50px'}}>
                <Tile title="Dienoraštis" content="Pasirinkite jums būdingą simptomą" size="large" color={'#757de8'} />

          </Grid>

          <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={'center'} justifyContent="center">
            <ThemeProvider theme={theme}>

                <Button
                 variant="contained"
                 color="primary"
                 sx={{ height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem' }}
                 onClick={ () => handleSymptomClick("Galvos skausmas")}
                 value = "Galvos skausmas"
                >
                  <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Galvos skausmas
                  </Typography>
                </Button>

               <Button
                 variant="contained"
                 color="primary"
                 sx={{height: buttonHeight, width: buttonWidth, textAlign: 'center',margin: '0.5rem'}}
                 onClick={ () => handleSymptomClick("Pilvo pūtimas")}
               >
                <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                  Pilvo pūtimas
                </Typography>

               </Button>

               <Button
                 variant="contained"
                 color="primary"
                 sx={{height: buttonHeight, width: buttonWidth, textAlign: 'center',margin: '0.5rem' }}
                 onClick={ () => handleSymptomClick("Svaigimas")}
               >
                <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                   Svaigimas
                </Typography>

               </Button>

               <Button
                 variant="contained"
                 color="primary"
                 sx={{height: buttonHeight, width: buttonWidth, textAlign: 'center',margin: '0.5rem' }}
                 onClick={ () => handleSymptomClick("Pykinimas")}
               >
                <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                   Pykinimas
                </Typography>

               </Button>

               <Button
                 variant="contained"
                 color="primary"
                 sx={{height: buttonHeight, width: buttonWidth, textAlign: 'center',margin: '0.5rem' }}
                 onClick={ () => handleSymptomClick("Vėmimas")}
               >
                <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                   Vėmimas
                </Typography>

               </Button>

               <Button
                 variant="contained"
                 color="primary"
                 sx={{height: buttonHeight, width: buttonWidth, textAlign: 'center',margin: '0.5rem' }}
                 onClick={ () => handleSymptomClick("Gerklės skausmas")}
               >
                <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                   Gerklės skausmas
                </Typography>

               </Button>
               <Button
                 variant="contained"
                 color="primary"
                 sx={{height: buttonHeight, width:buttonWidth, textAlign: 'center', margin: '0.5rem' }}
                 onClick={ () => handleSymptomClick("Skausmas")}
               >
                <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                     Skausmas
                </Typography>

               </Button>
               <Button
                 variant="contained"
                 color="primary"
                 sx={{height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem' }}
                 onClick={ () => handleSymptomClick("Bėrimas")}
               >
                <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                  Bėrimas
                </Typography>

               </Button>
               <Button
                 variant="contained"
                 color="primary"
                 sx={{height: buttonHeight, width: buttonWidth, textAlign: 'center', margin: '0.5rem', marginBottom: '50px' }}
                 onClick={ () => handleSymptomClick("Aukštas spaudimas")}
               >
                <Typography sx={{ maxWidth: '100%', fontSize: { xs: '0.6rem', sm: '1rem' }, }}>
                    Aukštas spaudimas
                </Typography>

               </Button>

              </ThemeProvider>
          </Grid>

          </MainContentWrapper>




        </Main>
        )}
        {activeBox === 2 && (
            <Main open={drawerOpen}>
            {/* breadcrumb */}

            <MainContentWrapper>

            <Breadcrumbs />

            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  sx={{justifyContent: 'center',  marginTop: '20px'}}>
              <Grid item>
                <Button variant="outlined" onClick={() => handleToggle(1)}>Dienoraštis</Button>
              </Grid>
              <Grid item>
                <Divider orientation="vertical"/>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => handleToggle(2)}>Apžvalga</Button> 
              </Grid>

            </Grid>


            {/* Grid container for arranging tiles */}
            {/* Grid container for arranging tiles */}
            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '30px', marginBottom: '50px'}}>
                  

            </Grid>
            
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={{ xs: 1, sm: 2, md: 3 }}>
              <ThemeProvider theme={theme}>
                
                <Grid item sx = {{}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                    sx = {{backgroundColor: 'white', borderRadius: '6px', marginRight:'20px', }}
                    label = "Pasirinkite datą"
                    value={FindDate.FindDate}
                    format="YYYY-MM-DD"
                    
                    
                    onChange={handleApzvalgaDateChange}
                    slotProps={{ textField: { required: true}}}
                    />
                  </LocalizationProvider>
                  
                </Grid>
                <Grid item>
                <Button variant="contained" color="success" onClick={handleFindClick}>Ieškoti</Button>
                </Grid>
                <div>
                  
                    {/* Additional JSX code */}
                </div>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>


                      <Box sx={{ marginBottom: '50px', height: '300px', width: '100%'}}>
                        <DataGrid
                                  sx={{
                                    boxShadow: 2,
                                    border: 1,
                                    borderColor: 'primary.dark',
                                    '& .MuiDataGrid-cell:hover': {
                                      color: 'white',
                                    },
                                    backgroundColor: '#2196f3' ,
                                    resize: 'none' 
                                     
                                  }}
                                  style={{ '--header-background-color': '#2196f3', '--header-text-color': 'white' } as any}
                          rows={rows}
                          columns={columns} 
                          checkboxSelection
                          disableRowSelectionOnClick
                          
                        />
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
              onSubmit={handleSubmit}     
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
                height: '332px',
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
              <Box sx={{zIndex: 10001}}>
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


              <Box sx={{alignItems: 'center',justifyContent: 'center', textAlign: 'center', position: 'relative', top: '20px', maxWidth: '600px' }}>
                <TextareaAutosize  
                style={{ width: '100%', resize: 'none'  }}
                minRows={6}
                placeholder="Trumpas komentaras apie simptomą"
                value={Journal.description}
                onChange={handleTextareaChange} 
                 />
              </Box>
              <Box alignItems="center"  justifyContent="center" sx={{ justifyContent: 'center', marginTop: '30px' }}>
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

