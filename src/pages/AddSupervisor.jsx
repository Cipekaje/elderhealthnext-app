import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Button, TextField, Container, Typography, Box } from "@mui/material";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const SupervisorInvitation = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const userID = session?.user?.id;
  console.log("User ID EMAIL IVEDIME:", userID);
  const handleBackButton = () => {
    router.back();
  };
  const submit = (event) => { // Explicitly specifying event type
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/supervisor/add-supervisor", { email: email, userID: userID }) // Pass userID to API
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status === 200) {
          toast.success(response.message, { theme: "colored" });
        } else if (response.status === 400) {
          toast.error(response.message, { theme: "colored" });
        } else if (response.status === 500) {
          toast.error(response.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
      });
  };

  return (
    <>
      <ToastContainer />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Pridėti prižiūrėtoją
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, textAlign: "center" }}>
            Įveskite asmens, kurį norite pakviesti kaip prižiūrėtoją, el. pašto adresą.
          </Typography>
          <Box component="form" onSubmit={submit} sx={{ mt: 3, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="El. paštas"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Apdorojama" : "Siųsti pakvietimą"}
            </Button>
          </Box>
          <Grid item>
            <Typography variant="body2" style={{ cursor: 'pointer', color: 'blue' }} onClick={handleBackButton}>
              Grįžti atgal
            </Typography>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
export default SupervisorInvitation;
