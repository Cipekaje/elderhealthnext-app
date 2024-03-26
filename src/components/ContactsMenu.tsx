import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

const ContactSection = () => {
  // Example data - replace this with your actual contact information
  const administrators = [
    { name: 'Mindaugas Padegimas', email: 'mind@example.com', phone: '+370 60770117', duties: 'Sistemos administratorius' },
    { name: 'Lukas Vaičaitis', email: 'luka@example.com', phone: '+370 50550117', duties: 'Tinklo administratorius' },
    { name: 'Nedas Reketis', email: 'neda@example.com', phone: '+370 50550338', duties: 'Duomenų bazės administratorius' },
    { name: 'Martynas Burneika', email: 'mart@example.com', phone: '+370 33330117', duties: 'Saugos administratorius' },
    { name: 'Marijus Petraitis', email: 'mari@example.com', phone: '+370 50551111', duties: 'Žiniatinklio administratorius' },
    { name: 'Tomas Neris', email: 'toma@example.com', phone: '+370 50821835', duties: 'Serverio administratorius' },
    // Add more administrators as needed
  ];

  return (
    <>
      <Typography variant="h5" paddingLeft={1} gutterBottom>Mūsų kontaktai</Typography>
      <Grid container spacing={2}>
        {administrators.map((admin, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ marginBottom: 2 }}>
            <Box border={1} borderColor="grey.300" borderRadius={4} p={2}>
              <Typography variant="h6" marginBottom={1}>{admin.name}</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>El. paštas: {admin.email}</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>Telefono nr.: {admin.phone}</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>Pareigos: {admin.duties}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ContactSection;
