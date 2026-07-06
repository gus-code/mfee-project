import { Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useState, useEffect} from "react";
import { ModalActions, ModalBackground, ModalContent, PageContainer } from "./CategoriesPage.styles";
import DenseTable from "../../Table/Table"
import { Category } from "../../../types";
import {getCategories,updateCategories,createCategory,deleteCategory,} from "../../../api/endpoints/categories";

/*const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel"},
  { id: "663fef70d513515319546d2f", name: "Food"},
  { id: "663fef70d513515319546d3f", name: "Entertainment"},
];
*/

function CategoriesPage() {
  // ACT 6
  const [rows, setRows] = useState<Category[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const isEditMode = selectedCategory !== null;

  useEffect(() => {
  getCategories({
    onSuccess: (data) => setRows(data),
    onError: (err) => console.error(err),
  });
}, []);

   // ACT 9 
  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const form = event.currentTarget;
    const categoryName = (form.elements.namedItem("categoryName") as HTMLInputElement).value;

    if(!categoryName) return;

    if(isEditMode){
      updateCategories({
        id: selectedCategory!._id,
        updatedCategory: { name: categoryName },
        onSuccess: (updated) => {
          setRows((prev) =>
            prev.map((row) => row._id === updated._id ? updated : row ));
        },
        onError: (err) => console.error(err),
      }
    );
    } else {
        createCategory({
          newCategory: { name: categoryName },
          onSuccess: (data) => {
            setRows((prev) => [...prev, data]);
          },
          onError: (error) => { console.error(error);
            alert("Failed to create new categoryy");
          },
        }
      );
    }

    form.reset();
    setModalOpen(false);
    setSelectedCategory(null);

  };

  const handleAddItem = ()=>{
    setSelectedCategory(null);
    setModalOpen(true);
  }

   // ACT 6
  const handleEditItem = (category: Category)=>{
    setSelectedCategory(category);
    setModalOpen(true);
  }
  
  const handleDeleteItem = (id:string)=> {
    deleteCategory({
      id,
      onSuccess: () => {
        setRows((prevRows) => prevRows.filter((row) => row._id !== id));
      },
      onError: (error) => {console.error(error);alert("Failed to delete category");},
    });
  };
  

  return (
    <PageContainer container>
     <h3> Categories Page</h3>
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        {/* ACT 8 */}
        <IconButton color="primary" onClick={handleAddItem}>
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* ACT 6  */}
        <DenseTable rows={rows} onEdit={(category) => {
            setSelectedCategory(category);
            setModalOpen(true);
          }}
          onDelete={handleDeleteItem}/>
      </Grid>
      {/* ACT 8 */}
      {modalOpen && (
        <ModalBackground>
          <ModalContent>
            <h3>{isEditMode? "Edit Category": "Add Category"}</h3>
            <form onSubmit={handleSubmitForm}>
              <input name="categoryName" type="text" placeholder="Category name" defaultValue={isEditMode ? selectedCategory?.name: ""}/>
              <ModalActions>
                <button type="button" onClick={()=> {
                  setModalOpen(false);
                  setSelectedCategory(null);
                }}>Cancel</button>
                <button type="submit">{isEditMode ? "Update" : "Submit"}</button>
              </ModalActions>
            </form>
          </ModalContent>
        </ModalBackground>
      )}
    </PageContainer>
  );
}

export default CategoriesPage;
