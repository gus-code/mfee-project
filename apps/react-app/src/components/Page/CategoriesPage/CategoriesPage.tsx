import { Grid } from "@mui/material";

import { PageContainer } from "./CategoriesPage.styles";
import { useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import { CategoryTable } from "../../Table/Table";
import { Category } from "apps/react-app/src/types";

const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel" },
  { id: "663fef70d513515319546d1f", name: "Food" },
];

// ACT 9 - Use the getList, create, edit, delete and update categories APIs

function CategoriesPage() {
  const [rows, setRows] = useState<Category[]>([]);

  useEffect(() => {
    setRows(categories);
  }, [])

  const handleEditItem = () => {
    return;
  }

  const handleDeleteItem = () => {
    return;
  }
  

  // ACT 6 - Create a state called "rows"
  // ACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value.
  //ACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem"
  return (
    <PageContainer container>
      Categories Page
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        <AddIcon/>
        <p>Edit</p>
        {/* ACT 8 - Use the IconButton component (from MUI) to open the Modal */}
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* ACT 6 - Create a component called "Table" to display category names */}
        <CategoryTable categories={rows}/>
      </Grid>
      {/* ACT 8 - Create a Modal to add new categories and update existing ones */}
    </PageContainer>
  );
}

export default CategoriesPage;
