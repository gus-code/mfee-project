import { AxiosError, AxiosResponse } from "axios";

import axios from "../axios";
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from "../../types";

export const getCategories = async ({
  onSuccess,
  onError,
  onLoading,
}: {
  onSuccess?: (data: Category[]) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: "/categories",
    method: "get",
  })
    .then((response: AxiosResponse) => {
      const data: Category[] = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};


// ACT 9 
export const createCategory = async ({
  newCategory,
  onSuccess,
  onError,
  onLoading,
}: {
  newCategory: CreateCategoryPayload;
  onSuccess?: (data: Category) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);
  await axios({
    url: "/categories",
    method: "post",
    data: newCategory,
  })
    .then((response: AxiosResponse) => {
      const data: Category = response.data;
      if (response.status === 200  || response.status === 201 && onSuccess) {
        onSuccess?.(data);
      }
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const deleteCategory = async ({
  id,
  onSuccess,
  onError,
  onLoading,
}: {
  id: string | number;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);
  await axios({
    url: `/categories/${id}`,
    method: "delete",
  })
    .then((response: AxiosResponse) => {
      if (response.status === 200 && onSuccess) { onSuccess?.(); }
    })
    .catch((error: AxiosError) => { 
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() =>  onLoading && onLoading(false));
};

export const updateCategories = async ({
  id,
  updatedCategory,
  onSuccess,
  onError,
  onLoading,
}: {
  id: string | number;
  updatedCategory: UpdateCategoryPayload;
  onSuccess?: (data: Category) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);
  await axios({
    url: `/categories/${id}`,
    method: "patch", 
    data: updatedCategory,
  })
    .then((response: AxiosResponse) => {
      const data: Category = response.data;
      if (response.status === 200 && onSuccess) { onSuccess(data); }
    })
    .catch((error: AxiosError) => { 
      console.error(`${error}`); 
      onError && onError(error);
   })
    .finally(() => onLoading && onLoading(false));
};

