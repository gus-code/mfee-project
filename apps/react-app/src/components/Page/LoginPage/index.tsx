import { PageContainer } from "./LoginPage.styles";
import { useState, useEffect} from "react";
import { validator } from "../../../common/utils";
import Paper from '@mui/material/Paper';
import { Grid, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, SelectChangeEvent } from "@mui/material";
import { AuthResponse, Input, NewCategory } from "apps/react-app/src/types";
import {login, createUser} from "../../../api/endpoints/auth";
import { useAuth } from "./../../../api/AuthContext";
import PostPage from "../PostPage";

interface LoginInterface {
  username: string;
  password: string;
}

interface SignupInterface {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { loginAuth, isAuthenticated } = useAuth();
  const [loginInfo, setLoginInfo] = useState<LoginInterface[]>([]);
  const [openLogin, setOpenLogin] = useState<boolean>(false);

  {/* Manejo de data Login*/}
  const [isLogginIn, setIsLogginIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [authData, setAuthData] = useState<AuthResponse | null>(null);

  const [signupInfo, setSignupInfo] = useState<SignupInterface[]>([]);
  const [opensignup, setOpenSignup] = useState<boolean>(false);

  {/* Manejo de data Signup */}
  const [signupError, setSignupError] = useState<string | null>(null);

  const handleSaveLogin = (data: NewLogin) => {
    setLoginError(null);

    login({
      user:{
        username: data.username,
        password: data.password,
      },
      onLoading: (loading) => setIsLogginIn(loading),
      onSuccess: (authResponse)=>{
        setAuthData(authResponse);
        loginAuth(authResponse.accessToken)
        setOpenLogin(false);
      },
      onError: (error) => {
        setLoginError(
          (error.response?.data as any)?.message ?? "credenciales inválidas"
        );
      },
    });
  };

  const handelSaveSignup = (data: NewSignup) => {
    createUser({
      newUser: {username: data.username, password: data.password},
      onSuccess: (authResponse)=>{
        setAuthData(authResponse);
        loginAuth(authResponse.accessToken)
        setOpenSignup(false);
      },
      onError: (error) => {
        setSignupError(
          (error.response?.data as any)?.message ?? "Error al crear usuario"
        );
      },
      onLoading: (loading) => setIsLogginIn(loading),
    });
  };

 

  return (
    <PageContainer container>
      Login Page
      <Grid item md={4} xs={4} lg={4}>
        {/* LsitoACT 8 - Create a form to Login and SignUp */}
       
        {!isAuthenticated && (
          <>
            <Button variant="contained" onClick={() => setOpenLogin(true)}>
              Log in
            </Button>
            <Button variant="contained" onClick={() => setOpenSignup(true)}>
              Sign up
            </Button>
          </>
        )}

        {signupInfo.length > 0 && (
          <>
            <h1>Signup - Ready!</h1>
            <p> Username: {signupInfo[signupInfo.length-1].username}</p>
          </>
        )}

        <LoginForm 
          open={openLogin}
          setOpen={setOpenLogin}
          onSave={handleSaveLogin}
          isLoading={isLogginIn}
          errorMessage={loginError}
        />

        <SignupForm 
          open={opensignup}
          setOpen={setOpenSignup}
          onSave={handelSaveSignup}
          isLoading={isLogginIn}
          errorMessage={signupError}
        />
      </Grid>
    </PageContainer>
  );
};

export default LoginPage;

// -----------------LoginForm component
type LoginInput = {
  username: Input,
  password: Input,
}

type NewLogin = {
  username: string,
  password: string,
}

const emptyInputsLogin: LoginInput = {
  username: { value: "", error: "" },
  password: { value: "", error: "" },
}

interface LoginProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (login: NewLogin) => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

function LoginForm({open, setOpen, onSave, isLoading, errorMessage}:LoginProps) {
  const [loginData, setLoginData] = useState<LoginInput>(emptyInputsLogin);

  const handleClose = () => {
    setLoginData(emptyInputsLogin);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const inputs = Object.values(loginData);
    const containError = inputs.map((input) => input.error).some((v) => !!v);
    
    if (containError) return;
  
    const newLogin: NewLogin = {
      username: loginData.username.value,
      password: loginData.password.value,
    };

    onSave(newLogin);
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) =>{
    const  {name, value} = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: { value, error: "" },
    }));
  };

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    const error = validator({ name, value });
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: { ...prevLoginData[name as keyof LoginInput], error },
    }));
  };

  return(
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}      
    >
      <DialogTitle>
        Login
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          id="username"
          name="username"
          label="username"
          type="text"
          value={loginData.username.value}
          error={!!loginData.username.error}
          helperText={loginData.username.error ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          label="password"
          type="password"
          value={loginData.password.value}
          error={!!loginData.password.error}
          helperText={loginData.password.error ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessage && (
          <p style={{ color: "red" }}>{errorMessage}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>{isLoading ? "Cargando..." : "Login"}</Button>
      </DialogActions>
    </Dialog>
  );
}



// -----------------SignupForm component

type SignupInput = {
  username: Input,
  password: Input,
}

type NewSignup = {
  username: string,
  password: string,
}

const emptyInputsSignup: SignupInput = {
  username: { value: "", error: "" },
  password: { value: "", error: "" },
}

interface SignupProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (login: NewSignup) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

function SignupForm({open, setOpen, onSave, isLoading, errorMessage}:SignupProps) {
  const [signupData, setSignupData] = useState<SignupInput>(emptyInputsSignup);

  const handleClose = () => {
    setSignupData(emptyInputsSignup);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const inputs = Object.values(signupData);
    const containError = inputs.map((input) => input.error).some((v) => !!v);
    if (containError) return;
  
    const newSignup: NewSignup = {
      username: signupData.username.value,
      password: signupData.password.value,
    };

    onSave(newSignup);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) =>{
    const  {name, value} = e.target;
    setSignupData((prevSignupData) => ({
      ...prevSignupData,
      [name]: { value, error: "" },
    }));
  };

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    const error = validator({ name, value });
    setSignupData((prevSignupData) => ({
      ...prevSignupData,
      [name]: { ...prevSignupData[name as keyof SignupInput], error },
    }));
  };

  return(
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}      
    >
      <DialogTitle>
        Signup
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          id="username"
          name="username"
          label="username"
          type="text"
          value={signupData.username.value}
          error={!!signupData.username.error}
          helperText={signupData.username.error ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          label="password"
          type="password"
          value={signupData.password.value}
          error={!!signupData.password.error}
          helperText={signupData.password.error ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>{isLoading ? "Cargando..." : "Signup"}</Button>
      </DialogActions>
    </Dialog>
  );
}
