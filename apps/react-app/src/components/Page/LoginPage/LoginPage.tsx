import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';

import { PageContainer } from './LoginPage.styles';
import { createUser, login } from '../../../api/endpoints/auth';
import { SnackbarContext } from '../../../context/SnackbarProvider';
import { NewUser } from '../../../types';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { createAlert } = useContext(SnackbarContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    login({
      user: { username, password },
      onSuccess: () => {
        const { protocol, host } = window.location;
        const signInUrl = `${protocol}//${host}/`;
        if (window.location.href !== signInUrl) {
          window.location.assign(signInUrl);
        }
        createAlert('You are successfully logged in!', 'success');
      },
      onError: () => {
        createAlert('Email or password is not matching with our record.', 'error');
      }
    });
  };

  const handleSignUp = ({ username, password }: NewUser) => {
    createUser({
      newUser: {
        username,
        password,
        firstName: 'John',
        lastName: 'Smith'
      }
    });
    createAlert('User successfully signed up!', 'success');
  };

  function handleUsername(str: string) {
    setUsername(str);
    console.log(username);
  }

  function handlePassword(str: string) {
    setPassword(str);
    console.log(password);
  }

  return (
    <PageContainer container>
      <Grid item md={4} xs={4} lg={3}>
        <Card>
          <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography id="login-heading" variant="h6" component="h2">
              Login
            </Typography>

            <TextField
              fullWidth
              {...(register('username'), { required: true })}
              id="username-input"
              label="Username"
              margin="dense"
              onChange={(e) => handleUsername(e.target.value)}
            />

            <TextField
              fullWidth
              {...(register('password'), { required: true, minLength: 4 })}
              id="password-input"
              label="Password"
              type="password"
              margin="dense"
              onChange={(e) => handlePassword(e.target.value)}
            />

            <CardActions style={{ float: 'right' }} className="card-actions">
              <Button
                color="primary"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSignUp({ firstName: 'John', lastName: 'Smith', username: username, password: password });
                }}
              >
                SIGN UP
              </Button>

              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                LOGIN
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </PageContainer>
  );
};

export default LoginPage;
