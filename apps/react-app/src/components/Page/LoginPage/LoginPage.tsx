import { useState } from "react";
import { NewUser, User } from "../../types";
import SignUpForm from "../../Form/SignUpForm";
import LoginForm from "../../Form/LoginForm";
import { PageContainer } from "./LoginPage.styles";
import { Button, Grid, Paper, Typography, Alert, Box } from "@mui/material";

 // ACT 9 - Use the login and register APIs

const LoginPage = () => {
  const [option, setOption] = useState("login");
  const [users, setUsers] = useState<User[]>([]);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleAdd = (data: NewUser) => {
    const newUser: User = {
      username: data.username,
      password: data.password,
    };
    setUsers((prev) => [...prev, newUser]);
    setOption("login");
    setLoginMessage("User created. Please log in.");
    setLoginError(null);
  };

  const handleLogin = (data: { username: string; password: string }) => {
    const userFound = users.find(
      (user) => user.username === data.username && user.password === data.password
    );

    if (userFound) {
      setLoginMessage("Login exitoso");
      setLoginError(null);
    } else {
      setLoginMessage(null);
      setLoginError("Usuario o contraseña incorrectos");
    }
  };

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
            <LoginForm
              onLogin={handleLogin}
              loginMessage={loginMessage}
              loginError={loginError}
            />
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">Crear cuenta</Typography>
              <SignUpForm onAdd={handleAdd} />
            </Box>
          )}
        </Paper>
      </Grid>
    </PageContainer>
  );
};

export default LoginPage;
