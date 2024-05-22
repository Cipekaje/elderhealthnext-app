import { Box, Paper, Typography, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import emblemIcon from '../../public/Logo.png';

const UserDataForm = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const name = user?.name || '';
  //const lastName = user?.lastName || '';
  const email = user?.email || '';

  const handleEditSettings = (): void => {
    router.push('/AccountSettings');
  };
  const handleSupervisorAdd = (): void => {
    router.push('/AddSupervisor');
  };

  const [lastName, setLastName] = useState(''); // State variable to hold the last name
  const userEmail = session?.user?.email; // Get the user's email

  useEffect(() => {
    const fetchLastName = async () => {
      if (!userEmail) {
        console.error("User email is missing");
        return;
      }

      try {
        // Pass the email in the query parameters
        const response = await fetch(`/api/lastName?email=${userEmail}`); // Correct the API call
        const data = await response.json();

        if (response.ok) {
          setLastName(data.lastName); // Set the retrieved lastName in the state
        } else {
          console.error("Failed to fetch last name:", data.message);
        }
      } catch (error) {
        console.error("Error fetching last name:", error);
      }
    };

    fetchLastName(); // Fetch lastName when component mounts
  }, [userEmail]);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Image src={emblemIcon} alt="ElderHealth Companion Emblem" width={40} height={50} />
        <Typography variant="h4">ElderHealth Companion</Typography>
      </Box>
      <Paper elevation={3} sx={{ padding: '20px', maxWidth: 400 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
          Jūsų paskyra
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Vardas:</Typography>
            <Typography variant="body1">{name}</Typography> {/* Display user's name */}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Pavardė:</Typography>
            <Typography variant="body1">{lastName}</Typography> {/* Display user's surname */}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">El. paštas:</Typography>
            <Typography variant="body1">{email}</Typography> {/* Display user's surname */}
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleEditSettings}>
              Keisti nustatymus
            </Button> { }
            <Button variant="contained" color="primary" onClick={handleSupervisorAdd}>
              Pridėti prižiūrėtoja
            </Button> { }
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserDataForm;
