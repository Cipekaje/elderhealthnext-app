import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Container, Typography, Box } from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent) => { // Explicitly specifying event type
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/forgot-password", { email: email })
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status === 200) {
          toast.success(response.message, { theme: "colored" });
        } else if (response.status === 400) {
          // setErrors(response.errors);
        } else if (response.status === 500) {
          toast.success(response.message, { theme: "colored" });
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
            Pamiršote slaptažodį?
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, textAlign: "center" }}>
            Nesijaudinkite atsiųsime jums slaptažodžio atkūrimo nuorodą į jūsų el. paštą.
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
              {loading ? "Processing" : "Siųsti"}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
