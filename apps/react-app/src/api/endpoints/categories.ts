import { AxiosError, AxiosResponse } from 'axios';
import axios from '../axios';
import { CategoriesResponse, NewCategory } from '../../types';

export const getCategories = async ({
  onSuccess,
  onError,
  onLoading
}: {
  onSuccess?: (data: CategoriesResponse[]) => void;
  onError?: (error: AxiosError) => void;
  onLoading?: (isLoading: boolean) => void;
}) => {
  onLoading && onLoading(true);

  await axios({
    url: '/categories',
    method: 'get'
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

export const getCategoriesList = async () => {
  return await axios({
    url: '/categories',
    method: 'get'
  });
};

//✅ ACT 9 - Create callbacks fuctions to call create, update and delete APIs

// export const createCategory = async ({
//   newCategory,
//   onSuccess,
//   onError,
//   onLoading
// }: {
//   newCategory: NewCategory;
//   onSuccess?: (data: CategoriesResponse) => void;
//   onError?: (data: AxiosError) => void;
//   onLoading?: (isLoading: boolean) => void;
// }) => {
//   onLoading && onLoading(true);

//   await axios({
//     method: 'post',
//     url: '/categories',
//     data: newCategory
//   })
//     .then((response: AxiosResponse) => {
//       const data: CategoriesResponse = response.data;
//       if (response.status === 200 && onSuccess) onSuccess(data);
//     })
//     .catch((error: AxiosError) => {
//       console.log(error);
//       onError && onError(error);
//     })
//     .finally(() => onLoading && onLoading(false));
// };

export const createCategory = async (newCategory: NewCategory) => {
  await axios({
    method: 'post',
    url: '/categories',
    data: newCategory
  })
    .then((response: AxiosResponse) => {
      console.log(response.data);
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

export const updateCategory = async (id: string, updatedCategory: NewCategory) => {
  await axios({
    method: 'patch',
    url: `/categories/${id}`,
    data: updatedCategory
  })
    .then((response: AxiosResponse) => {
      console.log(response);
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

export const deleteCategory = async (id: string) => {
  await axios({
    method: 'delete',
    url: `/categories/${id}`
  })
    .then((response: AxiosResponse) => {
      console.log(response);
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};
