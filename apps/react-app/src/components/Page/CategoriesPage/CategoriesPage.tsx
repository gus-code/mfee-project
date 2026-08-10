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
import EditIcon from '@mui/icons-material/Edit';


import { PageContainer } from "./CategoriesPage.styles";
import { Category } from "../../../types";

const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel" },
  { id: "663fef70d513515319546d1f", name: "Food" },
];

interface TableCategoryProps {
  categoriesList: Category[];
}


function CategoriesPage() {
  // ListoACT 6 - Create a state called "rows"
  const [rows, setRows] = useState<Category[]>([]);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  // ListoACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value.
  useEffect(() => {
    setRows(categories);
  }, []);

  const handleSave = (data: NewCategory) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: data.category
    };
      
    setRows((prev) => [...prev, newCategory]);
    setOpenCategory(false);
  };

  // ListoACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem"
  function handleEditItem () {}
  function handleDeleteItem () {}

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
        <TableCategory categoriesList={rows}/>
      </Grid>
      {/* ListoACT 8 - Create a Modal to add new categories and update existing ones */}
      <AddCategoryForm 
        open={openCategory}
        setOpen={setOpenCategory}
        onSave={handleSave}
      />
    </PageContainer>
  );
}

export default CategoriesPage;

function TableCategory ({categoriesList}: TableCategoryProps){
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
              key={category.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.name}
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
}


function AddCategoryForm ({open, setOpen, onSave}:AddCategoryFormProps) {
  const [ categoryData, setCategoryData] = useState<CategoryInput>(emptyInputs);

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
        Add category
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
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}