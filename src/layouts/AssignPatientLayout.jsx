import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Grid, FormControl, Alert, Button, Snackbar, Select, InputLabel, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';

// project imports
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import PatientList from '../components/PatientList';


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

// ==============================|| ASSIGN PATIENT LAYOUT ||============================== //

const AssignPatientLayout = () => {
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [assignSuccess, setAssignSuccess] = useState(false);
  const [assignError, setAssignError] = useState(null);

  //Session
  const { data: session } = useSession();
  const doctorID = session?.user?.id;

  const handleLeftDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClose = () => {
    setAssignError(null);
  };

  const fetchPatients = async () => {
    try {
      // Fetch the doctor ID from your session or wherever it's available
      const response = await fetch(`/api/patient/fetch?doctorId=${doctorID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const fetchedPatients = await response.json();
      setPatients(fetchedPatients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Optionally display an error message to the user
    }
  };

  useEffect(() => {
    fetchPatients();
    console.log("doctor id: ", doctorID);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePatientSelect = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleAssignPatient = async (patientID) => {
    try {
      const response = await fetch(`/api/patient/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doctorId: doctorID, patientId: patientID })
      });

      if (response.ok) {
        setAssignSuccess(true);

        fetchPatients();
      } else {
        throw new Error('Failed to assign patient.');
      }
    } catch (error) {
      console.error('Error assigning patient:', error);
      setAssignError('Nepavyko pridėti paciento.');
    }
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

  return (
    <div>
      <CssBaseline />
      {/* header */}
      <AppBar enableColorOnDark color="inherit" elevation={0}>
        <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
      </AppBar>

      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleLeftDrawerToggle} userType="doctor" />

      <Main open={drawerOpen} sx={{ overflow: 'auto' }}>
        <MainContentWrapper>
          <div style={{ padding: '22px' }}>
            <Typography variant="h4" marginBottom={'10px'}>Pridėti pacientą</Typography>

            {/* Search bar */}
            {patients.length > 0 && (
              <TextField
                label="Ieškoti pacientų"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            )}

            {/* Patient List */}
            {patients.length > 0 && <PatientList patients={patients} searchTerm={searchTerm} onAssignPatient={handleAssignPatient} />}

            {/* Success Snackbar */}
            <Snackbar open={assignSuccess} autoHideDuration={3000} onClose={() => setAssignSuccess(false)}>
              <Alert onClose={() => setAssignSuccess(false)} severity="success" sx={{ width: '100%' }}>
                Pacientas sėkmingai pridėtas!
              </Alert>
            </Snackbar>

            {/* Error Snackbar */}
            <Snackbar open={!!assignError} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {assignError}
              </Alert>
            </Snackbar>
          </div>
        </MainContentWrapper>
      </Main>

      <Footer />
    </div>
  );
};


export default AssignPatientLayout;
