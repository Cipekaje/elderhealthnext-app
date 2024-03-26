import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import { Breadcrumbs } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// styles
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme'
})(({ theme }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: '20px', // Adjust margin left as needed
  width: 'calc(100% - 20px)', // Adjust width as needed
  padding: '16px',
  [theme.breakpoints.up('md')]: {
    marginLeft: 'calc(20px + 240px)', // Adjust margin left for larger screens
    width: 'calc(100% - 260px)', // Adjust width for larger screens
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: '10px', // Adjust margin right for smaller screens
  }
}));

// ==============================|| MAIN DASHBOARD LAYOUT ||============================== //

const UserDasboardLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}>
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      {/* drawer */}
      <Sidebar />

      {/* main content */}
      <Main>
        {/* breadcrumb */}
        <Breadcrumbs />
        <Outlet />
      </Main>
    </Box>
  );
};

export default UserDasboardLayout;
