import { Grid } from "@mui/material";

import { PageContainer } from "./CategoriesPage.styles";
import { useEffect, useState } from "react";
import { Category, HeadCell } from "../../../types";

import {EnhancedTable} from "./../../Table";

const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel" },
  { id: "663fef70d513515319546d1f", name: "Food" },
];

const headCells: HeadCell[] = [
  {id: "name", label: "Category"}
];

function CategoriesPage() {
  const [rows, setRows] = useState<Category[]>([]);
  useEffect(() => {
    setRows(categories)
  },[])
  const handleEditItem = () => {};
  const handleDeleteItem = () => {};

  return (
    <PageContainer container>
      Categories Page
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        {/* ACT 8 - Use the IconButton component (from MUI) to open the Modal */}
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <EnhancedTable rows={rows} headCells={headCells} handleDeleteItem={handleDeleteItem} handleItem={handleEditItem} />
      </Grid>
      {/* ACT 8 - Create a Modal to add new categories and update existing ones */}
    </PageContainer>
  );
}

export default CategoriesPage;
