import { AxiosError, AxiosResponse } from "axios";

import axios from "../axios";
import { /* Category, */ CategoriesResponse, NewCategory } from "../../types";

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

export const createCategory = async ({
  newCategory,
  onSuccess,
  onError,
  onLoading,
}: {
  newCategory: NewCategory;
  onSuccess?: (data: CategoriesResponse[]) => void;
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
      const data: CategoriesResponse[] = response.data;
      if (response.status === 200 && onSuccess) onSuccess(data);
    })
    .catch((error: AxiosError) => {
      console.error(`${error}`);
      onError && onError(error);
    })
    .finally(() => onLoading && onLoading(false));
};

export const updateCategory = async ({
  categoryId,
  updatedCategory,
  onSuccess,
  onError,
  onLoading,
}: {
  categoryId: string;
  updatedCategory: NewCategory;
  onSuccess?: (data: CategoriesResponse[]) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: `/categories/${categoryId}`,
    method: "patch",
    data: updatedCategory,
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

export const deleteCategory = async ({
  categoryId,
  onSuccess,
  onError,
  onLoading,
}: {
  categoryId: string;
  onSuccess?: (data: CategoriesResponse[]) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: `/categories/${categoryId}`,
    method: "delete",
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
