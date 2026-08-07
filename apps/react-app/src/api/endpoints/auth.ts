import { AxiosError, AxiosResponse } from "axios";

import axios from "../axios";
import { AuthResponse, LoginPayload, RegisterPayload } from "../../types";

export const createUser = async ({
  newUser,
  onSuccess,
  onError,
  onLoading,
}: {
  newUser: RegisterPayload;
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    method: "post",
    url: `/auth/register`,
    data: newUser,
  })
    .then((response: AxiosResponse) => {
      const data: AuthResponse = response.data;
      if (response.status === 201 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const login = async ({
  user,
  onSuccess,
  onError,
  onLoading,
}: {
  user: LoginPayload;
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    method: "post",
    url: `/auth/login`,
    data: user,
  })
    .then((response: AxiosResponse) => {
      const data: AuthResponse = response.data;
      if (response.status === 200 && onSuccess) {
        onSuccess(data);
      }
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const logout = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: `/auth/logout`,
    method: "post",
  })
    .then((response: AxiosResponse) => {
      const data: AuthResponse = response.data;
      if (response.status === 200 && onSuccess) {
        localStorage.removeItem("apiToken");
        onSuccess(data);
      }
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const refreshToken = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: `/auth/refresh`,
    method: "post",
  })
    .then((response: AxiosResponse) => {
      const data: AuthResponse = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};
