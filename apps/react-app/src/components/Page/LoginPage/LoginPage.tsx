import { PageContainer } from "./LoginPage.styles";
import { useState } from "react";
import { Grid, Button, Stack, Typography } from "@mui/material";
import { login, createUser } from "../../../api";
import { AuthInterface, NewAuth } from "apps/react-app/src/types";
import AuthForm from "./AuthForm";



const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState<AuthInterface[]>([]);
  const [openLogin, setOpenLogin] = useState<boolean>(false);

  const [signupInfo, setSignupInfo] = useState<AuthInterface[]>([]);
  const [opensignup, setOpenSignup] = useState<boolean>(false);

  const handleSaveLogin = async (data: NewAuth) => {
    const newLogin: AuthInterface = {
      username: data.username,
      password: data.password,
    };

    await login({
      user: newLogin,
      onSuccess: (response) => {
        localStorage.setItem("token", response.accessToken);
        setLoginInfo((prev) => [...prev, newLogin]);
        setOpenLogin(false);
        const { protocol, host } = window.location;
        const signInUrl = `${protocol}//${host}/profile`;
        if (window.location.href !== signInUrl) {
          window.location.assign(signInUrl);
        };
      },
      onError: (error) => {
        console.log("Login falló", error);
      },
      onLoading: () => undefined,
    });
  };

  const handleSaveSignup = async (data: NewAuth) => {
    const newSignup: AuthInterface = {
      username: data.username,
      password: data.password,
      name: data.name,
      lastnmae: data.lastname,
    };

    await createUser({
      newUser: newSignup,
      onSuccess: (response) => {
        localStorage.setItem("token", response.accessToken);
        setSignupInfo((prev) => [...prev, newSignup]);
        setOpenLogin(false);
      },
      onError: (error) => {
        console.log("Signup falló", error);
      },
      onLoading: () => undefined,
    });
  };

  return (
<PageContainer container justifyContent="center" alignItems="center">
  <Grid item md={4} xs={4} lg={4}>
    <Typography variant="h4" component="h1" gutterBottom>
      Login Page
    </Typography>
    <h1>Inicia sesión o crea una cuenta</h1>

    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={() => setOpenLogin(true)}>
        Log in
      </Button>
      <Button variant="outlined" onClick={() => setOpenSignup(true)}>
        Sign up
      </Button>
    </Stack>

    <AuthForm 
          formType={"login"}
          open={openLogin}
          setOpen={setOpenLogin}
          onSave={handleSaveLogin}
        />

        <AuthForm 
          formType={"signup"}
          open={opensignup}
          setOpen={setOpenSignup}
          onSave={handleSaveSignup}
        />
  </Grid>
</PageContainer>
  );
};

export default LoginPage;

