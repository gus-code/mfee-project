import { Button, Grid, Modal, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { PageContainer } from "./CategoriesPage.styles";
import { CategoriesResponse, Category } from "../../../types";
import TableComponent from "../../Table";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton, CardContent } from "@mui/material";
import { getCategories, createCategories, updateCategories, deleteCategories }  from "../../../api";

 const headers: string[] = ["Name", "Actions"];

 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function CategoriesPage() {
  // ACT 6 - Create a state called "rows"
  const [rows, setRows] = useState<Category[] | null>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updatedCategory, setUpdatedCategory] = useState<Category>();
  const [initialValueUpdatedCategory, setInitialValueUpdatedCategory] = useState<Category>();
  // ACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value.

  const getCategoriesList = useCallback(async () => {
    const onSuccess = (data: CategoriesResponse[]) => {
      const newRows = data.map((category) => ({
        id: category._id,
        name: category.name,
      }));
      setRows(newRows);
    };

    const onError = () => {
      // createAlert({
      //   message: "Something went wrong.",
      //   severity: "error",
      // });
    };

    const onLoading = (isLoading: boolean) => {
    };

    await getCategories({ onSuccess, onError, onLoading });
  }, []);

  const createCategory = useCallback(async (data: string) => {
    const onSuccess = (data: CategoriesResponse) => {
      getCategoriesList();
    };

    const onError = () => {
      // createAlert({
      //   message: "Something went wrong.",
      //   severity: "error",
      // });
    };

    const onLoading = (isLoading: boolean) => {
    };

    const name = data;

    await createCategories({ onSuccess, onError, onLoading, name });
  }, []);

  useEffect(() => {
    getCategoriesList();
  }, []);

  const updateCategoryApi = useCallback(async (id: string, name: string) => {
    const onSuccess = (data: CategoriesResponse) => {
      getCategoriesList();
    };

    const onError = () => {
      // createAlert({
      //   message: "Something went wrong.",
      //   severity: "error",
      // });
    };

    const onLoading = (isLoading: boolean) => {
    };

    await updateCategories({ onSuccess, onError, onLoading, id, name });
  }, []);

  useEffect(() => {
    getCategoriesList();
  }, []);

  const deleteCategoryApi = useCallback(async (id: string) => {
    const onSuccess = (data: CategoriesResponse) => {
      getCategoriesList();
    };

    const onError = () => {
      // createAlert({
      //   message: "Something went wrong.",
      //   severity: "error",
      // });
    };

    const onLoading = (isLoading: boolean) => {
    };

    await deleteCategories({ onSuccess, onError, onLoading, id });
  }, []);

  useEffect(() => {
    getCategoriesList();
  }, []);
  //ACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem"
  function handleDeleteItem(id: string){
    deleteCategoryApi(id);
  }

  function handleClose(){
    setIsModalOpened(false);
  }

  function openModal(){
    setIsUpdate(false);
    setIsModalOpened(true);
  }

  function handleCreate(){
    if(newCategory.length === 0){
      setErrorInput(true);
    }else {
      setErrorInput(false);
      //setRows([...(rows || []), {id: Math.random.toString(), name: newCategory}]);
      createCategory(newCategory);
      setIsModalOpened(false);

    }
  }

  function handleChange(value: string){
    setNewCategory(value);
    if(value.length > 0){
      setErrorInput(false);
    }else{
      setErrorInput(true);
    }
  }

  function handleChangeUpdate(category: Category){
    setUpdatedCategory(category);
    if(category.name.length > 0){
      setErrorInput(false);
    }else{
      setErrorInput(true);
    }
  }

  function updateCategory(){
    updateCategoryApi(initialValueUpdatedCategory!.id, updatedCategory!.name);
  }

  function handleEdit(category: Category){
    setIsUpdate(true);
    setIsModalOpened(true);
    setUpdatedCategory(category);
    setInitialValueUpdatedCategory(category);
  }

  function handleUpdate(){
    if(updatedCategory?.name.length === 0){
      setErrorInput(true);
    }else{
      updateCategory();
      setIsUpdate(false);
      setIsModalOpened(false);
    }
  }
  return (
    <PageContainer container>
      Categories Page
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        {/* ACT 8 - Use the IconButton component (from MUI) to open the Modal */}
        <IconButton onClick={openModal}><AddCircleOutlineIcon/></IconButton>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
       <TableComponent handleEdit={handleEdit} headers={headers} categories={rows} handleDeleteItem={handleDeleteItem}/>
      </Grid>
      {/* ACT 8 - Create a Modal to add new categories and update existing ones */}
      <Modal
        open={isModalOpened}
        onClose={handleClose}
      >
       <CardContent sx={style}>
          {!isUpdate ? <h3>Create Category</h3> : <h3>Update Category</h3>}
          {!isUpdate ? <TextField label="Name" required fullWidth error={errorInput} onChange={(event) => handleChange(event.target.value)}></TextField> : <TextField label="Name" required fullWidth error={errorInput} onChange={(event) => handleChangeUpdate({id: updatedCategory!.id, name: event.target.value})} value={updatedCategory!.name}></TextField>}
          <div style={{marginTop: '2rem', textAlign: 'right'}}>
            <Button variant="outlined" sx={{mr:1}} onClick={handleClose}>CANCEL</Button>
            {!isUpdate ? <Button variant="contained" onClick={handleCreate}>CREATE</Button> : <Button variant="contained" onClick={handleUpdate}>UPDATE</Button>}
          </div>
       </CardContent>
      </Modal>
    </PageContainer>
  );
}

export default CategoriesPage;
