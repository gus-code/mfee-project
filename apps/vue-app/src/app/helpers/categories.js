import capstoneApi from '../api/capstoneApi';

export const getCategories = async () => {
  let categories = [];

  await capstoneApi
    .get('/categories')
    .then(({ data }) => {
      categories = data;
    })
    .catch((e) => console.error(e));

  return categories;
};

export const createCategory = async (newCategory) => {
  let status = false

  await capstoneApi
    .post('/categories', newCategory)
    .then(() => {
      status = true;
    })
    .catch((e) => console.error(e));

  return status;
};

export const updateCategory = async (category) => {
  let status;
  const updatedCategory = { name: category.name };

  await capstoneApi
    .patch(`/categories/${category._id}`, updatedCategory)
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};

export const deleteCategory = async (id) => {
  let status;
  await capstoneApi
    .delete(`/categories/${id}`)
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};
