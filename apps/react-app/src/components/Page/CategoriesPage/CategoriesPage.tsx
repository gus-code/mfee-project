import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AxiosError, AxiosResponse } from 'axios';

import { PageContainer } from './CategoriesPage.styles';
import { createCategory, deleteCategory, getCategories /* updateCategory */, updateCategory } from '../../../api';
import axiosInstance from '../../../api/axios';
import { /* CreateAlert, */ SnackbarContext } from '../../../context/SnackbarProvider';
import { CategoriesResponse, Category, NewCategory } from '../../../types';

const emptyCategory = { id: '', name: '' };
const emptyInput = {
  name: { value: '', error: '' }
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  padding: '1em',
  bgcolor: 'background.paper',
  // boxShadow: 24,
  p: 4
};

function CategoriesPage() {
  const [category, setCategory] = useState<Category>(emptyCategory); // The category to be edited.
  const [formData, setFormData] = useState(emptyInput);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Category[] | null>(null);
  const { createAlert } = useContext(SnackbarContext);

  // const handleAdd = (categoryName: string) => {
  //   categories.push({
  //     id: categories[categories.length - 1].id,
  //     name: categoryName
  //   });
  //   setRows(categories);
  //   handleClose();
  // };

  const onError = useCallback(() => {
    createAlert('Something went wrong.', 'error');
  }, [createAlert]);

  const getCategoryList = useCallback(async () => {
    const onSuccess = async (data: CategoriesResponse[]) => {
      const newList = data.map((category) => ({
        id: category._id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        __v: category.__v
      }));
      setRows(newList);
    };

    const params = { onSuccess, onError };
    await getCategories(params);
  }, [onError]);

  const addCategory = useCallback(
    async (newCategory: NewCategory) => {
      const onSuccess = async () => {
        await getCategoryList();
        createAlert('Category successfully created.', 'success');
      };

      await createCategory({ newCategory, onSuccess, onError });
    },
    [createAlert, getCategoryList, onError]
  );

  const updateCategoryData = useCallback(
    async ({ categoryId, updatedCategory }: { categoryId: string; updatedCategory: NewCategory }) => {
      const onSuccess = async () => {
        await getCategoryList();
        createAlert('Category successfully updated.', 'success');
      };

      await updateCategory({ categoryId, updatedCategory, onSuccess, onError });
    },
    [createAlert, onError, getCategoryList]
  );

  const removeCategory = useCallback(
    async ({ categoryId }: { categoryId: string }) => {
      const onSuccess = async () => {
        await getCategoryList();
        createAlert('Category successfully deleted.', 'success');
      };
      await deleteCategory({ categoryId, onSuccess, onError });
    },
    [createAlert, onError, getCategoryList]
  );

  const handleClose = () => {
    setFormData(emptyInput);
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputs = Object.values(formData);
    const containError = inputs.map((input) => input.error).some((v) => !!v);
    if (containError) return;

    const newCategory: NewCategory = {
      name: formData.name.value
    };

    handleClose();

    category !== emptyCategory
      ? await updateCategoryData({
          categoryId: category.id,
          updatedCategory: newCategory
        })
      : await addCategory(newCategory);

    setCategory(emptyCategory);
  };

  const handleOpen = () => setOpen(true);

  const handleNew = () => {
    handleOpen();
    setCategory(emptyCategory);
  };

  function handleEditItem(category: Category) {
    handleOpen();
    setCategory(category);
  }

  useEffect(() => {
    axiosInstance({
      url: '/categories',
      method: 'get'
    })
      .then((res: AxiosResponse) => {
        getCategoryList();
      })
      .catch((res: AxiosError) => {
        console.log(res);
      });
  });

  return (
    <PageContainer container>
      <Grid item sx={{ justifyContent: 'flex-end', display: 'flex' }}>
        <IconButton aria-label="open" onClick={handleNew}>
          <AddIcon />
        </IconButton>
      </Grid>

      <Grid item sx={{ flexGrow: 1 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCategory({ categoryId: row.id });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        handleEditItem(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
          style: style
        }}
        aria-labelledby="categories-title"
        aria-describedby="categories-desc"
      >
        <DialogTitle>{category !== emptyCategory ? `Edit category ${category.id}` : 'Add a category'}</DialogTitle>

        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Category name"
          fullWidth
          variant="standard"
          onChange={(e) => setFormData({ name: { value: e.target.value, error: '' } })}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Dialog>
    </PageContainer>
  );
}

export default CategoriesPage;
