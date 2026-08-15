import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axios";

import axios from "../axios";
import { CategoryN } from "../../types";

export interface CreateCategoryPayload {
  name: string;
}

export interface UpdateCategoryPayload {
  id: string;
  name: string;
}

export const getCategories = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: CategoryN[]) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axiosInstance({
    url: "/categories",
    method: "get",
  })
    .then((response: AxiosResponse) => {
      const data: CategoryN[] = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

// ListoACT 9 - Create callbacks fuctions to call create, update and delete APIs

// --- create
export const createCategory = async (
  {
    newCategory,
    onSuccess,
    onError,
    onLoading
  }:{
    newCategory: CreateCategoryPayload;
    onSuccess?: (data: CategoryN) => void;
    onError?: (error: AxiosError) => void;
    onLoading?: (isLoading: boolean) => void;
  }
) => {
  onLoading && onLoading(true);

  await axiosInstance({
    method: 'post',
    url: `/categories`,
    data: newCategory
  })
    .then((response: AxiosResponse) => {
      const data: CategoryN = response.data;
      if (response.status === 201 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));

};

// --- update
export const updateCategory = async (
  {
    payload,
    onSuccess,
    onError,
    onLoading
  }:{
    payload: UpdateCategoryPayload;
    onSuccess?: (data: CategoryN) => void;
    onError?: (error: AxiosError) => void;
    onLoading?: (isLoading: boolean) => void;
  }
) => {
  const {id, ...updateData} = payload;

  onLoading && onLoading(true);

  await axiosInstance({
    url: `/categories/${id}`,
    method: 'patch',
    data: updateData
  })
    .then((response: AxiosResponse) => {
      const data: CategoryN = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));

};

// --- delete
export const deleteCategory = async (
  {
    categoryID,
    onSuccess,
    onError,
    onLoading
  }:{
    categoryID: string;
    onSuccess?: () => void;
    onError?: (error: AxiosError) => void;
    onLoading?: (isLoading: boolean) => void;
  }
) => {
  onLoading && onLoading(true);

  await axiosInstance({
    url: `/categories/${categoryID}`,
    method: 'delete'
  })
    .then((response: AxiosResponse) => {
      if (response.status === 204 && onSuccess) onSuccess();
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};