import { useState } from "react";
import SignUpForm from "../../Form/SignUpForm";
import LoginForm from "../../Form/LoginForm";
import { PageContainer } from "./LoginPage.styles";
import { Button, Grid, Paper, Typography, Box } from "@mui/material";

 // ACT 9 - Use the login and register APIs

   // ACT 11 - After the login is successful, save the accessToken in local storage and use the following to direct the user to the home page:
  // const { protocol, host } = window.location;
  // const signInUrl = `${protocol}//${host}/`;
  // if (window.location.href !== signInUrl) {
  //   window.location.assign(signInUrl);
  // }

const LoginPage = () => {
  const [option, setOption] = useState("login");


  return (
    <PageContainer container>
      <Typography variant="h4" component="h1" gutterBottom>
        Autenticación
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button
          variant={option === "login" ? "contained" : "outlined"}
          onClick={() => setOption("login")}
        >
          Log In
        </Button>
        <Button
          variant={option === "signup" ? "contained" : "outlined"}
          onClick={() => setOption("signup")}
        >
          Sign Up
        </Button>
      </Box>

      <Grid item xs={12} md={6} lg={5}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          {option === "login" ? (
            <LoginForm/>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">Crear cuenta</Typography>
              <SignUpForm />
            </Box>
          )}
        </Paper>
      </Grid>
    </PageContainer>
  );
};

export default LoginPage;
