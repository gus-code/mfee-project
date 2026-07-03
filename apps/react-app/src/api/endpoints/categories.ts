
import { UpdateCategory } from "../../types";
import api from "../axios";

export const getAllCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
}

export const getCategoryById = async (id: string) => {
  const { data } = await api.get(`/categories/${id}`);
  return data;
}

export const updateCategory = async ( category: UpdateCategory ) => {
  const { data } = await api.patch(`/categories/${category.id}`, { name: category.name } );
  return data;
}

export const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
}

export const createCategory = async (name: string ) => {
  const { data } = await api.post('/categories', { name });
  return data;
}
