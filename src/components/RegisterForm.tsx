import React, { useState } from 'react';
import Input from './Input';
import Container from '@mui/material/Container';
import { Alert, Avatar, Box, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/material/Icon';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import router from 'next/router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ToggleButton from '@mui/material/ToggleButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ElderHealthCompanion.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



interface User {
  firstName: string;
  lastName: string;  
  
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: Dayjs | null;


  
}

function Register() {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: null,
    
  });

  const [error, setError] = useState<string | null>(null);
  const [error1, setError1] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if ( !user.email || !user.password || !user.confirmPassword || !user.firstName || !user.lastName || !user.birthdate) {
      setError('Prašome užpildyti visus laukus');
      return;
    }
    if(user.password != user.confirmPassword) {
      setError1('Slaptažodžiai nesutampa');
      return;
    }
    else{
      
      router.push('/Login');
      alert('Registracija sėkminga!');
    }

    console.log(user);

 



    if (user) {
      const response = await fetch('/api/auth/register', {
        method: "POST",
        body: JSON.stringify(user)
        
      });
      
      if (response.ok) {
        
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registracija nesėkminga!');
      }
    }
    setError(null);
    setUser({
      ...user,
      firstName: '',
      lastName: '',      
      
      email: '',
      password: '',
      confirmPassword: '',
     birthdate: null,
      
    });
    
    
    
  };

  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handlePasswordChange = (event: any) => {
    setUser({ ...user, password: event.target.value });
  };
  const handleConfirmPasswordChange = (event: any) => {
    setUser({ ...user, confirmPassword: event.target.value });
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const defaultTheme = createTheme();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const handleDateChange = (date: Dayjs | null) => { // Explicitly type 'date' parameter
    if (date) {
      //const formattedDate = date.format('YYYY-MM-DD'); // Format the date
      setUser({
        ...user,
        birthdate: date
      });
    }
  };
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '100vh',
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Registracija
          </Typography>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  //id="firstName"
                  label="Vardas"
                  autoFocus
                  value={user.firstName}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  //id="lastName"
                  label="Pavardė"
                  name="lastName"
                  autoComplete="family-name"
                  value={user.lastName}
                  onChange={handleChange}
                />

              </Grid>
              

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  //id="email"
                  label="El. Paštas"
                  name="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={handleChange}
                />

              </Grid>
              
              <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel htmlFor="outlined-adornment-password">Slaptažodis</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handlePasswordChange}
                    endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    }
                  label="Password"
                  
                  />
              </FormControl>
              </Grid>
              
              <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required >
                <InputLabel htmlFor="outlined-adornment-password">Slaptažodžio patvirtinimas</InputLabel>
                  <OutlinedInput
                    id="confirmpassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    onChange={handleConfirmPasswordChange}
                    endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    }
                  label="Confirm Password"
                  value={user.confirmPassword}
                  />
              </FormControl>
              {error1 && <div style={{ color: 'red' }}>{error1}</div>}
              </Grid> 
              
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                 
                  label = "Gimimo data"
                  value={user.birthdate}
                  format="YYYY-MM-DD"
                  defaultValue={dayjs('2022-04-17')}
                  onChange={handleDateChange}
                  slotProps={{ textField: { fullWidth: true, required: true}}}
                  />
                 </LocalizationProvider>

              </Grid>
              
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}

            </Grid>
              <Button 
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
               >
               Registruotis
               </Button>            

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Jau turite paskyrą? Prisijunkite
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    
      
  );
  
}

export default Register;
