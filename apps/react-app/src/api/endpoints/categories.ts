import { AxiosError, AxiosResponse } from "axios";

import axios from "../axios";
import {
  // Category,
  CategoriesResponse,
  // NewCategory
} from "../../types";

export const getCategories = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: CategoriesResponse[]) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: "/categories",
    method: "get",
  })
    .then((response: AxiosResponse) => {
      const data: CategoriesResponse[] = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const createCategories = async ({
  onSuccess,
  onError,
  onLoading,
  name
}: {
  onSuccess?: (data: CategoriesResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
  name: string;
}) => {

  onLoading && onLoading(true);

  await axios({
    url: "/categories",
    method: "post",
    data: {
      name: name
    }
  })
  .then((response: AxiosResponse) => {
    const data: CategoriesResponse = response.data;
    if((response.status === 200 || response.status === 201) && onSuccess) onSuccess(data);
  })
  .catch((error: AxiosError) => {
    console.error(`${error}`);
    onError && onError(error);
  })
  .finally(() => onLoading && onLoading(false));
};

export const updateCategories = async ({
  onSuccess,
  onError,
  onLoading,
  id,
  name
}: {
  onSuccess?: (data: CategoriesResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
  id: string;
  name: string;
}) => {

  onLoading && onLoading(true);

  await axios({
    url: "/categories/"+id,
    method: "patch",
    data: {
      name: name
    }
  })
  .then((response: AxiosResponse) => {
    const data: CategoriesResponse = response.data;
    if((response.status === 200 || response.status === 201) && onSuccess) onSuccess(data);
  })
  .catch((error: AxiosError) => {
    console.error(`${error}`);
    onError && onError(error);
  })
  .finally(() => onLoading && onLoading(false));
};

export const deleteCategories = async ({
  onSuccess,
  onError,
  onLoading,
  id
}: {
  onSuccess?: (data: CategoriesResponse) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
  id: string;
}) => {

  onLoading && onLoading(true);

  await axios({
    url: "/categories/"+id,
    method: "delete",
  })
  .then((response: AxiosResponse) => {
    const data: CategoriesResponse = response.data;
    if((response.status === 200 || response.status === 200) && onSuccess) onSuccess(data);
  })
  .catch((error: AxiosError) => {
    console.error(`${error}`);
    onError && onError(error);
  })
  .finally(() => onLoading && onLoading(false));
};

// ACT 9 - Create callbacks fuctions to call create, update and delete APIs
