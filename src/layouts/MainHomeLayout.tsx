import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden'; // Import Hidden component
import DropdownMenu from '@/components/DropDownMenu'; // Assuming DropdownMenu is in the same directory
import { Stack, Button, Box } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import CheckIcon from '@mui/icons-material/Check';
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';

import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import { useRouter } from 'next/router';

// Import next/image for image handling
import Image from 'next/image';

// Import your emblem image
import emblemIcon from '../../public/Logo.png'; // Adjust the path

interface MainHomeLayoutProps {
  children: React.ReactNode;
}

const MainHomeLayout = ({ children }: MainHomeLayoutProps) => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login'); // Navigate to the "/Login" page
  };
  const handleHelpClick = () => {
    router.push('/Help'); // Navigate to the "/Login" page
  };

  return (
    <div style={{ height: '100vh', position: 'relative', display: 'flex', flexFlow: 'column' }}>
      {/* APIE MUS SEKCIJA IR PRENUMERCIJOS IR VIRSUTINE SEKCIJA ir KOMENTARU SEKCIJA*/}
      <Container maxWidth="xl" style={{ paddingTop: '20px', overflow: 'auto' }}>

        {/* VIRSUTINE SEKCIJA */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" gutterBottom component="div" style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={emblemIcon} alt="ElderHealth Companion Emblem" width={46} height={46} />
              &nbsp; ElderHealth Companion
            </Typography>
          </Grid>
          <Grid item>
            <Hidden smDown>
              <Stack spacing={3} direction='row'>
                <Button endIcon={<FeedbackIcon />} onClick={handleLoginClick}>Atsiliepimai</Button>
                <Button endIcon={<HelpIcon />} onClick={handleHelpClick}>Pagalba</Button>
                <Button endIcon={<LoginIcon />} onClick={handleLoginClick}>Prisijungti</Button>
              </Stack>
            </Hidden>
          </Grid>
        </Grid>

        {/* Divider line below the entire top section */}
        <Box borderBottom="1px solid black" width="100%" marginBottom={1}></Box>

        {/* APIE MUS SEKCIJA */}
        <Box>
          <Typography variant="h5" color="black" paddingBottom={1.5}>
            Apie mus
          </Typography>
        </Box>
        <Box marginBottom={2} style={{
          position: 'relative', // Fixed position
          width: '100%',
          padding: '5px',
          border: '1px solid black', // Colored border
          borderRadius: '16px', // Adjust border-radius if needed
          boxSizing: "border-box",
        }}
        >
          <Typography variant="body1" color="gray">
            Trumpas aprašymas apie produktą PIRMAS PUNKTAS.
          </Typography>
        </Box>
        <Box marginBottom={2} style={{
          position: 'relative', // Fixed position
          width: '100%',
          padding: '5px',
          border: '1px solid black', // Colored border
          borderRadius: '16px', // Adjust border-radius if needed
          boxSizing: "border-box",
        }}
        >
          <Typography variant="body1" color="gray">
            Trumpas aprašymas apie produktą ANTRAS PUNKTAS.
          </Typography>
        </Box>



        {/* PRENUMERACIJU SEKCIJA */}
        <Box marginBottom={2} paddingTop={3}>
          <Typography variant="h5">
            Prenumeratų tipai
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {/* Professional Subscription Box */}
          <Grid item xs={12} sm={6}>
            <Hidden smUp>
              <Box style={{
                border: '1.5px solid black',
                borderRadius: '16px',
                padding: '16px',
                backgroundColor: 'rgba(25,25,100,0.75)',
              }}>
                <Typography variant="h6" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                  Profesinis
                </Typography>
                <Typography variant="h4" color="white" fontWeight="bold" gutterBottom>
                  $15.99/mėn.
                </Typography>
                <Divider />
                <Box display="flex" alignItems="left" paddingTop="15px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="rgba(255, 255, 255, 0.7)">
                    Gauni daug
                  </Typography>
                </Box>
                <Box display="flex" alignItems="left" paddingTop="10px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="rgba(255, 255, 255, 0.7)">
                    dark kazka gauni
                  </Typography>
                </Box>
                <Box display="flex" alignItems="left" paddingTop="10px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="rgba(255, 255, 255, 0.7)">
                    ir dar
                  </Typography>
                </Box>
                <Box display="flex" alignItems="left" paddingTop="10px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="rgba(255, 255, 255, 0.7)">
                    be ne daugiau
                  </Typography>
                </Box>

                <Box paddingTop="20px" style={{ width: '100%' }}>
                  <Button
                    variant="contained"
                    onClick={handleLoginClick}
                    style={{ width: '100%', opacity: 0.8, borderRadius: '20px' }}
                  >
                    Pradėti dabar
                  </Button>
                </Box>


              </Box>
            </Hidden>
            {/* Visible on small screens */}
            <Hidden smDown>
              <Box style={{
                border: '1.5px solid black',
                borderRadius: '16px',
                padding: '16px',
                backgroundColor: 'rgba(25,25,100,0.75)',
              }}>
                <Typography variant="h6" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                  Profesinis
                </Typography>
                <Typography variant="h4" color="white" fontWeight="bold" gutterBottom>
                  $15.99/mėn.
                </Typography>
                <Divider />
                <Box display="flex" alignItems="left" paddingTop="15px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="rgba(255, 255, 255, 0.7)">
                    Gauni daug
                  </Typography>
                </Box>
                <Box display="flex" alignItems="left" paddingTop="10px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="rgba(255, 255, 255, 0.7)">
                    dark kazka gauni
                  </Typography>
                </Box>
                <Box display="flex" alignItems="left" paddingTop="10px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="rgba(255, 255, 255, 0.7)">
                    ir dar
                  </Typography>
                </Box>
                <Box display="flex" alignItems="left" paddingTop="10px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="rgba(255, 255, 255, 0.7)">
                    be ne daugiau
                  </Typography>
                </Box>
                <Box paddingTop="20px" style={{ width: '100%' }}>
                  <Button
                    variant="contained"
                    onClick={handleLoginClick}
                    style={{ width: '100%', opacity: 0.8, borderRadius: '20px' }}
                  >
                    Pradėti dabar
                  </Button>
                </Box>
              </Box>
            </Hidden>
          </Grid>

          {/* Enterprise Subscription Box */}
          <Grid item xs={12} sm={6}>
            <Hidden smUp>
              <Box style={{
                border: '1.5px solid black',
                borderRadius: '16px',
                padding: '16px',
                backgroundColor: 'white',
              }}>
                <Typography variant="h6" gutterBottom>
                  Enterprise
                </Typography>
                <Typography variant="h4" color="black" fontWeight="bold" gutterBottom>
                  $9,99/mėn.
                </Typography>
                <Divider />
                <Box display="flex" alignItems="left" paddingTop="15px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="black">
                    nezinau kas cia
                  </Typography>
                </Box>
                <Box display="flex" alignItems="left" paddingTop="10px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="black">
                    pigiau nebus
                  </Typography>
                </Box>
                <Box paddingTop="20px" style={{ width: '100%' }}>
                  <Button
                    variant="contained"
                    onClick={handleLoginClick}
                    style={{ width: '100%', opacity: 0.8, borderRadius: '20px' }}
                  >
                    Pradėti dabar
                  </Button>
                </Box>
              </Box>
            </Hidden>
            <Hidden smDown>
              <Box style={{
                border: '1.5px solid black',
                borderRadius: '16px',
                padding: '16px',
                backgroundColor: 'white',
              }}>
                <Typography variant="h6" gutterBottom>
                  Enterprise
                </Typography>
                <Typography variant="h4" color="black" fontWeight="bold" gutterBottom>
                  $9,99/mėn.
                </Typography>
                <Divider />
                <Box display="flex" alignItems="left" paddingTop="15px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="black">
                    nezinau kas cia
                  </Typography>
                </Box>
                <Box display="flex" alignItems="left" paddingTop="10px">
                  <CheckIcon color="primary" />
                  <Typography variant="body1" component="span" color="black">
                    pigiau nebus
                  </Typography>
                </Box>
                <Box paddingTop="20px" style={{ width: '100%' }}>
                  <Button
                    variant="contained"
                    onClick={handleLoginClick}
                    style={{ width: '100%', opacity: 0.8, borderRadius: '20px' }}
                  >
                    Pradėti dabar
                  </Button>
                </Box>
              </Box>
            </Hidden>
          </Grid>
        </Grid>

        
        {/* COMMENTS */}
        <Box marginTop={4} marginBottom={2}>
          <Typography variant="h5">
            Atsiliepimai
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Testimonial 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box style={{
              border: '1px solid black',
              borderRadius: '16px',
              padding: '16px',
              backgroundColor: 'rgba(205, 209, 228, 0.35)',
              position: 'relative',
              minHeight: '120px'
            }}>
              {/* Testimonial content */}
              <Typography variant="body1" gutterBottom style={{ marginBottom: '40px' }}>
                Produktas man labai patinka :). Patarčiau visiems įsigyti.
              </Typography>
              {/* Avatar and Name */}
              <Box style={{ position: 'absolute', bottom: '8px', left: '16px', display: 'flex', alignItems: 'center' }}>
                {/* Avatar */}
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ marginRight: '8px' }} />
                {/* User Name */}
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>Rokas Nemunas</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Testimonial 2 */}
          <Grid item xs={12} sm={6} md={3} paddingBottom={2}>
            <Box style={{
              border: '1px solid black',
              borderRadius: '16px',
              padding: '16px',
              backgroundColor: 'rgba(205, 209, 228, 0.35)',
              position: 'relative',
              minHeight: '120px'
            }}>
              {/* Testimonial content */}
              <Typography variant="body1" gutterBottom style={{ marginBottom: '40px' }}>
                Produktas man nepatiko :(). Patarčiau visiems jo nepirkti.
              </Typography>
              {/* Avatar and Name */}
              <Box style={{ position: 'absolute', bottom: '8px', left: '16px', display: 'flex', alignItems: 'center' }}>
                {/* Avatar */}
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" style={{ marginRight: '8px' }} />
                {/* User Name */}
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>Tomas Neris</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Container>

      {/* APATINE SEKCIJA */}
      <Hidden smUp>
        <Box
          style={{
            position: 'static',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(108, 122, 137, 1)', // Adjust opacity here
            border: '0.75px solid black',
            borderBottom: '1px solid black',
            borderTop: '1px solid black',
            borderLeft: '0px solid black',
            borderRight: '0px solid black',
            borderRadius: '2px',
            zIndex: 10, // Set a high z-index value
          }}
        >
          <div style={{ position: 'relative', zIndex: 20 }}>
            <IconButton>
              <DropdownMenu />
            </IconButton>
          </div>
        </Box>
      </Hidden>

    </div>
  );
};

export default MainHomeLayout;
