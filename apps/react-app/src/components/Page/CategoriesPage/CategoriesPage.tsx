import { Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useState, useEffect} from "react";
import { ModalActions, ModalBackground, ModalContent, PageContainer } from "./CategoriesPage.styles";
import DenseTable from "../../Table/Table"
import { Category } from "../../../types";

const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel"},
  { id: "663fef70d513515319546d2f", name: "Food"},
  { id: "663fef70d513515319546d3f", name: "Entertainment"},
];

function CategoriesPage() {
  // ACT 6
  const [rows, setRows] = useState<Category[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const isEditMode = selectedCategory !== null;

  useEffect(() => {
    setRows(categories);
  }, []);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const form = event.currentTarget;
    const categoryName = (form.elements.namedItem("categoryName") as HTMLInputElement).value;

    if(!categoryName) return;

    if(isEditMode){
      setRows((prevRows)=>
      prevRows.map((row)=>
      row.id === selectedCategory?.id? {...row, name:categoryName} : row)
      );
    } else {
        const newCategory: Category = {
          id: (rows.length + 1).toString(),
          name: categoryName,
        };
        setRows([...rows,newCategory])
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
    setRows(
      (prevRows) => prevRows.filter(
        (row) => row.id !== id)
    );
  };
  

  return (
    <PageContainer container>
     <h3> Categories Page</h3>
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        {/* ACT 8 */}
        <IconButton color="primary" onClick={() => setModalOpen(true)}>
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
