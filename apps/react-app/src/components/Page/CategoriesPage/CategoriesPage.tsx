import { useState, useEffect} from "react";
import { validator } from "../../../common/utils";
import { Input } from "../../../types";
import { Grid } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, SelectChangeEvent } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { getCategories, updateCategory, deleteCategory, createCategory } from "../../../api/services/categories";

import { PageContainer } from "./CategoriesPage.styles";
import { CategoryN } from "../../../types";



const categories: CategoryN[] = [
  { _id: "663fef70d513515319551d1f", name: "Travel", createdAt: "2026-08-14T16:10:21.031Z", updatedAt: "2026-08-14T16:10:21.031Z", __v: 0 },
  { _id: "663fef70d513515319546d1f", name: "Fooduu", createdAt: "2026-08-14T16:10:21.031Z", updatedAt: "2026-08-14T16:10:21.031Z", __v: 0 },
];

interface TableCategoryProps {
  categoriesList: CategoryN[];
}


function CategoriesPage() {
  // ListoACT 6 - Create a state called "rows"
  const [rows, setRows] = useState<CategoryN[]>([]);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState<CategoryN[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryN | null>(null);

  // ListoACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value.
  useEffect(() => {
    setRows(categories);
  }, []);

  const handleGetCategories = () => {
    setLoginError(null);

    getCategories({
      onSuccess: (data: CategoryN[]) => {setCategoriesData(data);},
      onError: (error) => {
        setLoginError(
          (error.response?.data as any)?.message ?? "No se pudo cargar la información"
        );
      },
      onLoading: (loading) => setIsLoading(loading),
    });
  };

  useEffect (()=>{
    handleGetCategories();
  }, []);

  useEffect(() => {
    if (!openCategory) setCategoryToEdit(null);
  }, [openCategory]);
  
  const handleSave = (data: NewCategory) => {
    createCategory({
      newCategory: { name: data.category },
      onSuccess: (newCategory: CategoryN) => {
        setCategoriesData((prev) => prev ? [...prev, newCategory] : [newCategory]);
        setOpenCategory(false);
      },
      onError: (error) => {
        setLoginError(
          (error.response?.data as any)?.message ?? "No se pudo crear la categoria"
        );
      },
      onLoading: (loading) => setIsLoading(loading),
    });
  };

  // ListoACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem"
  // ListoACT 9 - Use the getList, create, edit, delete and update categories APIs


  const handleEditItem = (category: CategoryN) => {
    setCategoryToEdit(category);
    setOpenCategory(true);
  };

  const handleUpdateCategory = (data: NewCategory) => {
    if (!categoryToEdit) return;

    updateCategory({
      payload: {id: categoryToEdit._id, name: data.category,} ,
      onSuccess: (update: CategoryN) => {
        setCategoriesData((prev) => prev ? prev.map((cat) => (cat._id === update._id ? update : cat)) : prev);
        setOpenCategory(false);
        setCategoryToEdit(null);
      },
      onError: (error) => {setLoginError(
        (error.response?.data as any)?.message ?? "No se pudo editar la categoria");
      },
    });
  };
  //---------------------------------------------------

   // deleteCategory
  const handleDeleteItem = (ID: string) => {
    deleteCategory({
      categoryID: ID,
      onSuccess: () => {
        setCategoriesData((prev) => prev ? prev.filter((cat) => cat._id !== ID) : prev);
      },
      onError: (error) => {
        setLoginError((error.response?.data as any)?.message ?? "No se pudo eliminar la categoría");
      },
    });
  };
   //---------------------------------------------------

  if (isLoading || !categoriesData) return <p>Cargando...</p>;
  if (loginError) return <p>{loginError}</p>;

  return (
    <PageContainer container>
      Categories Page
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
         {/* ListoACT 8 - Use the IconButton component (from MUI) to open the Modal */}
        <IconButton onClick={() => setOpenCategory(true)}>
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* ListoACT 6 - Create a component called "Table" to display category names */}
        <TableCategory 
          categoriesList={categoriesData}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      </Grid>
      {/* ListoACT 8 - Create a Modal to add new categories and update existing ones */}
      <AddCategoryForm 
        open={openCategory}
        setOpen={setOpenCategory}
        onSave={categoryToEdit ? handleUpdateCategory : handleSave}
        initialData={categoryToEdit}
      />
    </PageContainer>
  );
}

export default CategoriesPage;

function TableCategory ({
  categoriesList,
  onEdit,
  onDelete,
}: TableCategoryProps & {
  onEdit: (category: CategoryN) => void;
  onDelete: (categoryId: string) => void;
}){
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Post category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoriesList.map((category) => (
            <TableRow
              key={category._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(category._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


// for AddCategoryForm component
type CategoryInput = {
  category: Input,
}

type NewCategory = {
  category: string,
}

const emptyInputs: CategoryInput = {
  category: { value: "", error: "" },
}

interface AddCategoryFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (category: NewCategory) => void;
  initialData?: CategoryN | null;
}


function AddCategoryForm ({open, setOpen, onSave, initialData}:AddCategoryFormProps) {
  const [ categoryData, setCategoryData] = useState<CategoryInput>(emptyInputs);

  useEffect(() => {
    if (open) {
      setCategoryData(
        initialData
          ? { category: { value: initialData.name, error: "" } }
          : emptyInputs
      );
    }
  }, [open, initialData]);

  const handleClose = () => {
    setCategoryData(emptyInputs);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const inputs = Object.values(categoryData);
    const containError = inputs.map((input) => input.error).some((v) => !!v);
    if (containError) return;
  
    const newCategory: NewCategory = {
      category: categoryData.category.value
    };

    onSave(newCategory);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) =>{
    const  {name, value} = e.target;
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      [name]: { value, error: "" },
    }));
  };

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    const error = validator({ name, value });
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      [name]: { ...prevCategoryData[name as keyof CategoryInput], error },
    }));
  };


  return(
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      {/* Title */}
      <DialogTitle>
        {initialData ? "Edit category" : "Add category"}
      </DialogTitle>
      {/* Form content */}
      <DialogContent>
        <TextField 
          required
          fullWidth
          id="category"
          name="category"
          label="category"
          type="text"
          value={categoryData.category.value}
          error={!!categoryData.category.error}
          helperText={categoryData.category.error ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </DialogContent>
      {/* Buttons */}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">{initialData ? "Update" : "Save"}</Button>
      </DialogActions>
    </Dialog>
  );
}