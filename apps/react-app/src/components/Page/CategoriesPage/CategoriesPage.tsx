import { useState, useEffect} from "react";
import { Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { getCategories, updateCategory, deleteCategory, createCategory } from "../../../api/services/categories";
import { PageContainer } from "./CategoriesPage.styles";
import { Category, NewCategory } from "../../../types";
import TableCategory from "./TableCategory";
import AddCategoryForm from "./AddCategoryForm";
import Loading from "../../Loading";


function CategoriesPage() {
  // ListoACT 6 - Create a state called "rows"
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  // ListoACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value.
 

  const handleGetCategories = () => {
    setLoginError(null);

    getCategories({
      onSuccess: (data: Category[]) => {setCategoriesData(data);},
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
      onSuccess: (newCategory: Category) => {
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

  const handleEditItem = (category: Category) => {
    setCategoryToEdit(category);
    setOpenCategory(true);
  };

  const handleUpdateCategory = (data: NewCategory) => {
    if (!categoryToEdit) return;

    updateCategory({
      payload: {id: categoryToEdit._id, name: data.category,} ,
      onSuccess: (update: Category) => {
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

  if (isLoading || !categoriesData) return <Loading />;
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
        <TableCategory 
          categoriesList={categoriesData}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      </Grid>

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






