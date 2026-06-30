import { Grid, Table } from "@mui/material";

import { PageContainer } from "./CategoriesPage.styles";
import { useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import { Category } from "apps/react-app/src/types";
import { CategoryTable } from "../../Table/Table";

const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel" },
  { id: "663fef70d513515319546d1f", name: "Food" },
];

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
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* ACT 6 - Create a component called "Table" to display category names */}
        <CategoryTable categories={rows}/>
      </Grid>
    </PageContainer>
  );
}

export default CategoriesPage;
