import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Grid, FormControl, Alert, Button, Snackbar, Select, InputLabel, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';
// project imports
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Tile from '../components/Tile';
import HeartrateTile from '../components/HeartrateTile';
import ChartTile from '../components/ChartTile';
import CurrentHeartrate from '../components/CurrentHrTile';
import Footer from '../components/Footer';
import FirstDayHR from '../components/FirstDayHR';
import DaySteps from '../components/DaySteps';
import DistanceStepsChart from '../components/DistanceStepsChart';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// styles
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme'
})(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  display: 'flex', // Use flexbox
  flexDirection: 'column', // Arrange children vertically
  flexGrow: 1, // Allow the main content to grow to fill available space
  padding: '20px',
  marginLeft: open ? '235px' : '8px', // Adjust margin left when sidebar is open or closed
  marginRight: '8px', // Add margin to the right to prevent content from sticking to the edge
}));

const MainContentWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#f0f4f4',
  borderRadius: '30px',
  marginTop: '70px',
  minHeight: 'calc(100vh - 70px)',
}));

// ==============================|| MAIN DASHBOARD LAYOUT ||============================== //

const UserDasboardLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Naudotojo informacijos gavimas
  const { data: session } = useSession();
  const user = session?.user;
  const userID = session?.user?.id;
  const { firstName } = user?.userInfo || {};
  const { isFirstLogin } = user?.userInfo || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [gender, setGender] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [disease, setDisease] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && isFirstLogin) {
      setIsModalOpen(true);
    }
  }, []);

  
  const handleLeftDrawerToggle = useCallback(() => {
    setDrawerOpen((prev) => {
      if (prev) {
        // Sidebar is currently open and will be closed
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, theme.transitions.duration.leavingScreen);
      }
      return !prev;
    });
  }, [theme.transitions.duration.leavingScreen]);
  const handleSave = async () => {
    const additionalInfo = {};
    if (gender) additionalInfo.gender = gender;
    if (lastName) additionalInfo.lastName = lastName;
    if (birthday) additionalInfo.birthdate = birthday;
    if (weight) additionalInfo.weight = weight;
    if (height) additionalInfo.height = height;
    if (disease) additionalInfo.disease = disease;
    
    if (!userEmail || Object.values(additionalInfo).some((val) => val === undefined)) {
      console.error("Trūksta informacijos");
      return;
    }

    try {
      const response = await fetch('/api/popUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, additionalInfo }),
      });

      if (response.ok) {
        setSnackbarMessage('Informacija sėkmingai atnaujinta!');
        setSnackbarOpen(true);
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        console.error('Klaida atnaujinant informaciją:', errorData.message);
      }
    } catch (error) {
      console.error('Klaida išsaugant:', error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'auto';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, []);
  return (
    <div>
      <CssBaseline />
      <AppBar enableColorOnDark color="inherit" elevation={0}>
        <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
      </AppBar>
      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleLeftDrawerToggle} />
      <Main open={drawerOpen} sx={{ overflow: 'auto', }}>
        <MainContentWrapper id="main-content-wrapper">
          <div style={{ padding: '22px' }}>
            <Grid container alignItems="center" justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={12} xl={4}>
                <Tile title="Blank Tile" content="Consectetur adipiscing elit." color="#5B5270" isLastInRow={!matchDownMd} userId={firstName} />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <CurrentHeartrate color="#F09537" isLastInRow={!matchDownMd} userId={userID} />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <HeartrateTile color="#603cac" isLastInRow={!matchDownMd} userId={userID} />
              </Grid>
              <Grid item xs={12}>
                <DistanceStepsChart color="#37F051" userId={userID} isSidebarOpen={drawerOpen} />
              </Grid>
              <Grid item xs={12}>
                <ChartTile color="#37F051" userId={userID} isSidebarOpen={drawerOpen} />
              </Grid>
              <Grid item xs={12} md={12} xl={6}>
                <FirstDayHR color="#F09537" userid={userID} />
              </Grid>
              <Grid item xs={12} md={12} xl={6}>
                <DaySteps color="#603cac" userid={userID} />
              </Grid>
            </Grid>
          </div>
        </MainContentWrapper>
      </Main>
      <Popup open={isModalOpen} closeOnDocumentClick={false}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h6">Papildoma informacija apie jus</Typography>
          <FormControl fullWidth style={{ marginTop: '10px' }}>
            <InputLabel>Lytis</InputLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)} label="Gender">
              <MenuItem value="Vyras">Vyras</MenuItem>
              <MenuItem value="Moteris">Moteris</MenuItem>
              <MenuItem value="Kita">Kita</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Pavardė" variant="outlined" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ marginTop: '10px' }} />
          <TextField
            label="Gimimo diena"
            variant="outlined"
            fullWidth
            type="date"
            value={birthday}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setBirthday(e.target.value)}
            style={{ marginTop: '10px' }}
          />
          <TextField label="Svoris (kg)" variant="outlined" fullWidth value={weight} onChange={(e) => setWeight(e.target.value)} style={{ marginTop: '10px' }} />
          <TextField label="Ūgis (cm)" variant="outlined" fullWidth value={height} onChange={(e) => setHeight(e.target.value)} style={{ marginTop: '10px' }} />
          <TextField label="Liga" variant="outlined" fullWidth value={disease} onChange={(e) => setDisease(e.target.value)} style={{ marginTop: '10px' }} />
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
              Išsaugoti
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Uždaryti
            </Button>
          </div>
        </div>
      </Popup>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
};

export default UserDasboardLayout;
