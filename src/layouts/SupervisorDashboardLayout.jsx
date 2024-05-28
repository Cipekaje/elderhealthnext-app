import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Grid, useMediaQuery } from '@mui/material';

// project imports
import Header from '../components/HeaderSupervisor';
import Sidebar from '../components/SupervisorSidebar';
import DropDownTile from '../components/DropDownTile';
import Tile from '../components/Tile';
import HeartrateTile from '../components/HeartrateTile';
import ChartTile from '../components/ChartTile';
import CurrentHeartrate from '../components/CurrentHrTile';
import Footer from '../components/Footer';
import DistanceStepsChart from '../components/DistanceStepsChart'
import FirstDayHR from '../components/FirstDayHR';
import DaySteps from '../components/DaySteps';

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

// query limitas
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


// ==============================|| MAIN SUPERVISOR DASHBOARD LAYOUT ||============================== //

const SupervisorDashboardLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedUserId, setSelectedUserId] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [currentHr, setCurrentHr] = useState(null);


  const [fetchCurrentHr, setFetchCurrentHr] = useState(true);
  const [fetchHeartrate, setFetchHeartrate] = useState(false);
  const [fetchChart, setChart] = useState(false);
  const [fetchFirstDayHR, setFetchFirstDayHR] = useState(false);
  const [fetchDistanceStepsChart, setFetchDistanceStepsChart] = useState(false);

  // Naudotojo informacijos gavimas
  const { data: session } = useSession();
  const user = session?.user;
  const userID = session?.user?.id;
  const { firstName } = user?.userInfo || {};
  // const { firstName } = user?.userInfo || {};
  // const { role } = user?.userInfo || {};

  // console.log("Session Data:", session);
  // console.log("Session Dataxd:", user?.userInfo);
  // console.log("testas", userID);
  // console.log("role", role);

  // useEffect(() => {
  //   if (currentHr && avgFirstMonthHR && currentHr > 1 * avgFirstMonthHR) {
  //     setAlertTriggered(true);
  //   } else {
  //     setAlertTriggered(false);
  //   }
  // }, [currentHr, avgFirstMonthHR]);

  // useEffect(() => {
  //   if (alertTriggered) {
  //     alert('Current heart rate is more than double the average!');
  //   }
  // }, [alertTriggered]);




  // Toggle function for sidebar
  const handleLeftDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    // Check if window object exists (i.e., if we're in the browser environment)
    if (typeof window !== 'undefined') {
      // Set overflow to 'auto' when the component mounts
      document.body.style.overflow = 'auto';

      // Optionally, you can remove the style when the component unmounts
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, []);

  // gauti pasirinkto vartotojo ID
  const handleUserChange = debounce((selectedUserId) => {
    setSelectedUserId(selectedUserId);
    // console.log("Selected user's ID:", selectedUserId);
  }, 900); // delay sk

  // const handleUserChange = (selectedUserId) => {
  //   setSelectedUserId(selectedUserId);
  //   console.log("Selected user's ID:", selectedUserId);
  // };
  return (
    <div>
      <CssBaseline />
      {/* header */}
      <AppBar enableColorOnDark color="inherit" elevation={0}>
        <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
      </AppBar>

      {/* <Sidebar drawerOpen={drawerOpen} drawerToggle={handleLeftDrawerToggle} /> */}
      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleLeftDrawerToggle} selectedUserId={selectedUserId} />
      <Main open={drawerOpen} sx={{ overflow: 'auto', }}>
        <MainContentWrapper>
          <div style={{ padding: '22px' }}>
            {/* dropdown */}
            <Grid item xs={12} md={4}>
              <DropDownTile color="#37A0F0" isLastInRow={!matchDownMd} userId={userID} onUserChange={handleUserChange} />
            </Grid>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {/* <Grid item xs={12} md={4}>
                <Tile title="Blank Tile" content="Consectetur adipiscing elit." color="#5B5270" isLastInRow={!matchDownMd} userId={firstName} />
              </Grid> */}
              <Grid item xs={12} md={4}>
                <CurrentHeartrate color="#F09537" isLastInRow={!matchDownMd} userId={selectedUserId} setCurrentHr={setCurrentHr} onFetchComplete={() => setFetchHeartrate(true)} />
              </Grid>
              {/* {fetchHeartrate && ( */}
              <Grid item xs={12} md={4}>
                <HeartrateTile color="#603cac" isLastInRow={!matchDownMd} userId={selectedUserId} onFetchComplete={() => setChart(true)} />
              </Grid>
              {/* )} */}
              {/* {fetchChart && ( */}
              <Grid item xs={12}>
                <ChartTile color="#37F051" userId={selectedUserId} isSidebarOpen={drawerOpen} onFetchComplete={() => setFetchDistanceStepsChart(true)} />
              </Grid>
              {/* )} */}
              {/* {fetchDistanceStepsChart && ( */}
              <Grid item xs={12}>
                <DistanceStepsChart color="#37F051" userId={selectedUserId} isSidebarOpen={drawerOpen} onFetchComplete={() => setFetchFirstDayHR(true)} />
              </Grid>
              {/* )} */}
              {/* {fetchFirstDayHR && ( */}
              <Grid item xs={12} md={4}>
                <FirstDayHR color="#F09537" userid={selectedUserId} />
              </Grid>
              <Grid item xs={12} md={12} xl={6}>
                <DaySteps color="#603cac" userid={selectedUserId} />
              </Grid>
              {/* )} */}
            </Grid>
          </div>

        </MainContentWrapper>
      </Main>
      <Footer />
    </div>
  );
};

export default SupervisorDashboardLayout;
