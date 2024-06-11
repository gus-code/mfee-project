import { useForm } from 'react-hook-form';
import { PageContainer } from './LoginPage.styles';
import { Grid } from '@mui/material';

import '../../FormStyles/styles.css';
import { AuthContext, AuthProvider } from '../../../context/authProvider';
import React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { AuthLoginResponse } from '../../../types';
import  axios from '../../../api/axios'

type Inputs = {
  userName: string;
  password: string;
};

interface Props {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const LoginPage = ({ setPage }: Props) => {
  const page: 'Login' | 'Signin' = 'Login';

  // const { authRegister, openSession } = React.useContext(AuthContext);

  const {
    register,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;

    console.log( { username, password } )

    if (page === 'Login') {
      await axios({
        method: 'post',
        url: `/auth/login`,
        data: { username, password }
      })
        .then((response: AxiosResponse) => {
          const data: AuthLoginResponse = response.data;
          if (response.status === 200) {
            const token = data.accessToken;
            setPage('HomePage')
            localStorage.setItem('apiToken', token);
          }
        })
        .catch((error: AxiosError) => {
          console.error(`${error}`);
        });
    } else {
      console.log('Save user');
    }
  };

  // ACT 9 - Use the login and register APIs
  return (
    <AuthProvider>
      <PageContainer container>
        {<h3> {page} Page </h3>}
        <Grid item md={4} xs={4} lg={4}>
          {/*✅ ACT 8 - Create a form to Login and SignUp */}

          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="userName-field"> User Name: </label>
              <input className="bgColor" id="userName-field" type="text" {...register('userName', { required: true })} />
              {errors.userName && <span> User name field is required. </span>}
            </div>

            <div>
              <label htmlFor="password-filed"> Passsword: </label>
              <input className="bgColor" id="password-filed" type="password" {...register('password', { required: true })} />
              {errors.password && <span> Password field is required. </span>}
            </div>

            <input type="submit" />
          </form>
        </Grid>
      </PageContainer>
    </AuthProvider>
  );
};
export default LoginPage;
