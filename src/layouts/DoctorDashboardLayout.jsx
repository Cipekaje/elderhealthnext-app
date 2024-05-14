import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Grid, FormControl, Alert, Button, Snackbar, Select, InputLabel, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';

// project imports
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import AssignedPatientsList from '../components/AssignedPatientsList';
import ConfirmationDialog from '../components/ConfirmationDialog';
import Summary from '../components/Summary';

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

// ==============================|| DOCTOR DASHBOARD LAYOUT ||============================== //

const DoctorDashboardLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  //Snackbar
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(null);

  //Summary
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [userIDForSummary, setUserIDForSummary] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Naudotojo informacijos gavimas
  const { data: session } = useSession();
  const doctorID = session?.user?.id;

  const handleLeftDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCloseSnackbar = () => {
    setSuccessSnackbar(false);
    setErrorSnackbar(null);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleConfirmationConfirm = () => {
    if (patientToDelete) {
      handleDeletePatient(patientToDelete);
      setConfirmationOpen(false);
      setPatientToDelete(null);
    }
  };

  const fetchPatients = async () => {
    console.log("Frontend doctor id before fetch: ", doctorID);
    try {
      if (!doctorID) {
        throw new Error('Doctor ID is undefined');
      }
      // Fetch the doctor ID from your session or wherever it's available
      const response = await fetch(`/api/patient/fetchAssigned?doctorId=${doctorID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const fetchedPatients = await response.json();
      setPatients(fetchedPatients);
    } catch (error) {
      console.error('Nepavyko gauti pacientų:', error);
      // Optionally display an error message to the user
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [doctorID]);

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

  const handleDeletePatient = async (patientID) => {
    try {
      const response = await fetch('/api/patient/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorID: doctorID, patientID: patientID }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete patient');
      }
      setSuccessSnackbar(true);
      //Update patient list
      fetchPatients();

    } catch (error) {
      setErrorSnackbar(error.message); // error message
    }
  };

  const handleCloseSummary = () => {
    setIsSummaryOpen(false);
    setUserIDForSummary(null);
  };

  const handleGetPatientSummary = async (patientID) => {
    try {
      setUserIDForSummary(patientID);
      setIsSummaryOpen(true);
    } catch (error) {
      setErrorSnackbar(error.message); // error message
    }
  };

  return (
    <div>
      <CssBaseline />
      {/* header */}
      <AppBar enableColorOnDark color="inherit" elevation={0}>
        <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
      </AppBar>

      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleLeftDrawerToggle} userType={"doctor"} />

      <Main open={drawerOpen} sx={{ overflow: 'auto' }}>
        <MainContentWrapper>
          <Box sx={{ padding: '22px' }}>
            <Typography variant="h4" marginBottom={'15px'}>Pridėtų pacientų sąrašas</Typography>
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
            {patients.length > 0 && <AssignedPatientsList
              patients={patients}
              searchTerm={searchTerm}
              onRemovePatient={(patientID) => {
                setPatientToDelete(patientID);
                setConfirmationOpen(true);
              }}
              onGetSummary={handleGetPatientSummary}
            />}

            {/* Success Snackbar */}
            <Snackbar open={successSnackbar} autoHideDuration={3000} onClose={() => setSuccessSnackbar(false)}>
              <Alert onClose={() => setSuccessSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                Pacientas sėkmingai pašalintas iš stebimų pacientų sąrašo!
              </Alert>
            </Snackbar>

            {/* Error Snackbar */}
            <Snackbar open={!!errorSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                {errorSnackbar}
              </Alert>
            </Snackbar>
            <ConfirmationDialog
              open={confirmationOpen}
              onClose={handleConfirmationClose}
              onConfirm={handleConfirmationConfirm}
              title="Pašalinti pacientą"
              message="Ar tikrai norite pašalinti šį pacientą?"
            />
          </Box>
        </MainContentWrapper>
      </Main>

      <Summary open={isSummaryOpen} userID={userIDForSummary} onClose={handleCloseSummary} />

      <Footer />
    </div>
  );
};

export default DoctorDashboardLayout;
