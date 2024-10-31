import { useState, FormEvent, Dispatch, SetStateAction, useCallback } from "react";
import { PageContainer } from "./LoginPage.styles";
import { Button, Grid } from "@mui/material";
import TextField from "../../TextField";
import { createUser, login } from "../../../api/endpoints/auth";
import { AuthLoginResponse, AuthResponse } from "../../../types/index";

export interface LoginFields{
  inputValueUsername: string | null,
  inputValuePassword: string | null
}

export interface SignUpFields{
  inputValueUsername: string | null,
  inputValuePassword: string | null,
  inputValueFirstName: string | null,
  inputValueLastName: string | null,
  inputValueConfirmPassword: string | null
}

interface TextFields<T>{
    id: string, 
    label: string,
    type: string, 
    value: string | null,
    keyName: string,
    error?: boolean
    setState: Dispatch<SetStateAction<T>>,
    comparePasswords?: (password: string | null, confirmPassword: string | null) => void; 
}

const LoginPage = () => {

  //ACT 11 - After the login is successful, use the following to direct the user to the home page:
  const { protocol, host } = window.location;
  

  const [signUp, setSignUp] = useState<boolean>(false);
  const [loginFields, setLoginFields] = useState<LoginFields>({
    inputValueUsername: null,
    inputValuePassword: null
  });
  const [singUpFields, setSignUpFields] = useState<SignUpFields>({
    inputValueUsername: null,
    inputValuePassword: null,
    inputValueFirstName: null,
    inputValueLastName: null,
    inputValueConfirmPassword: null
  });
  const [error, setError] = useState<boolean>(false);

  function comparePasswords(password: string | null, confirmPassword: string | null) {
    if (password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  }

  const textFieldsLogIn: TextFields<LoginFields>[] = [
    {
      id: "username-id",
      label: "User Name",
      type: "text",
      value: loginFields.inputValueUsername,
      keyName: "inputValueUsername",
      setState: setLoginFields      
    },
    {
      id: "password-id",
      label: "Password",
      type: "password",
      value: loginFields.inputValuePassword,
      keyName: "inputValuePassword",
      setState: setLoginFields      
    }
  ];

  const textFieldsSignUp: TextFields<SignUpFields>[] = [
    {
      id: "username-id-signup",
      label: "User Name",
      type: "text",
      value: singUpFields.inputValueUsername,
      keyName: "inputValueUsername",
      setState: setSignUpFields      
    },
    {
      id: "password-id-signup",
      label: "Password",
      type: "password",
      value: singUpFields.inputValuePassword,
      keyName: "inputValuePassword",
      error: error,
      comparePasswords: comparePasswords,
      setState: setSignUpFields      
    },
    {
      id: "first-name",
      label: "First Name",
      type: "text",
      value: singUpFields.inputValueFirstName,
      keyName: "inputValueFirstName",
      setState: setSignUpFields      
    },
    {
      id: "last-name",
      label: "Last Name",
      type: "text",
      value: singUpFields.inputValueLastName,
      keyName: "inputValueLastName",
      setState: setSignUpFields      
    },
    {
      id: "confirm-password",
      label: "Confirm Password",
      type: "password",
      value: singUpFields.inputValueConfirmPassword,
      keyName: "inputValueConfirmPassword",
      error: error,
      comparePasswords: comparePasswords,
      setState: setSignUpFields      
    }
  ]


  const createUserApi = useCallback(async () => {
    const onSuccess = (data: AuthResponse) => {

    }

    const onError = () =>{};

    const onLoading = () => {};

    createUser({ newUser: {firstname: singUpFields.inputValueFirstName!, lastname: singUpFields.inputValueLastName!, username: singUpFields.inputValueUsername!, password: singUpFields.inputValuePassword!}, onSuccess, onError, onLoading});
  }, [singUpFields]);

  const loginApi = useCallback(async () => {

    const onSuccess = (data: AuthLoginResponse) => {
      localStorage.setItem("token", data.accessToken);
      const signInUrl = `${protocol}//${host}/`;
      if (window.location.href !== signInUrl) {
        window.location.assign(signInUrl);
      }
    }

    const onError = () => {};

    const onLoading = () => {};

    login({ user: {username: loginFields.inputValueUsername!, password: loginFields.inputValuePassword!}, onSuccess, onError, onLoading});

  }, [loginFields]);

  function handleClickSignUp():void{
    if(signUp){
      createUserApi();
    }else{
      setSignUp(true);
    }
  }

  function handleClickLogIn():void{
    if(signUp){
      setSignUp(false);
    }else{
      loginApi();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>):void{
    event.preventDefault();
  }

  return (
    <PageContainer container>
      Login Page
      <Grid item md={4} xs={4} lg={4}>
        {/* ACT 8 - Create a form to Login and SignUp */}
        {!signUp && (
          <form onSubmit={handleSubmit}>
            {textFieldsLogIn.map(textField => {
              return <TextField {...textField} />
            })}
          </form>
        )}
        {signUp && (
          <form onSubmit={handleSubmit}>
            {textFieldsSignUp.map(textField => {
              return <TextField {...textField} />
            })}
          </form>
        )}
        <Button variant="outlined" style={{maxWidth: "250px"}} onClick={handleClickSignUp} sx={{mr:2}}>Sign Up</Button>
        <Button variant="contained" style={{maxWidth: "250px"}} onClick={handleClickLogIn}>Log In</Button>
      </Grid>
    </PageContainer>
  );
};

export default LoginPage;
