import capstoneApi from '../api/capstoneApi';

export const register = async (credentials) => {
  let status;
  await capstoneApi
    .post(`/auth/register`, credentials)
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};

export const login = async (credentials) => {
  let status;
  await capstoneApi
    .post(`/auth/login`, credentials)
    .then((response) => {
      status = true;
      const token = response.data.accessToken;
      localStorage.setItem("apiToken", token);
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};
