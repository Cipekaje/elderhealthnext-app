import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Grid, useMediaQuery } from '@mui/material';

// project imports
import { Breadcrumbs } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Tile from '../components/Tile';


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
  marginLeft: open ? '310px' : '15px', // Adjust margin left when sidebar is open or closed
  width: open ? 'calc(100% - 310px)' : 'calc(100% - 15px)', // Adjust width when sidebar is open or closed
  padding: '22px',
}));

const MainContentWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#DCDCDC',
  borderRadius: '30px',
  overflow: 'hidden',
  marginTop: '70px',
  height: 'calc(100vh - 70px)', // Make the div full screen height
}));

// ==============================|| MAIN DASHBOARD LAYOUT ||============================== //

const UserDasboardLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle function for sidebar
  const handleLeftDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <CssBaseline />
      {/* header */}
      <AppBar enableColorOnDark color="inherit" elevation={0}>
        <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
      </AppBar>

      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleLeftDrawerToggle} />

      <Main open={drawerOpen}>
        {/* breadcrumb */}
        <MainContentWrapper>
          <Breadcrumbs />

          {/* Grid container for arranging tiles */}
          {/* Grid container for arranging tiles */}
          <Grid container spacing={3}>
            {/* First chart takes 2 rows and 6 columns */}
            <Grid item xs={12} md={8} sx={{ height: '600px' }}>
              <Tile title="Chart 1" content="Lorem ipsum dolor sit amet." color="#F5F5F5" size="large" />
            </Grid>
            {/* Second chart takes 1 row and 6 columns */}
            <Grid item xs={12} md={4}>
              <Tile title="Chart 2" content="Consectetur adipiscing elit." color="#E0E0E0" />
            </Grid>
            {/* Add more Grid items as needed */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Tile title="Average Data" content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." color="#D3D3D3" size="large" />
            </Grid>
          </Grid>

        </MainContentWrapper>
      </Main>
    </Box>
  );
};

export default UserDasboardLayout;
