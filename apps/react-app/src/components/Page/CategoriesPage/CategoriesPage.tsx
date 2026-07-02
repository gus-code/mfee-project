import { Grid } from "@mui/material";

import { useState, useEffect} from "react";
import { PageContainer } from "./CategoriesPage.styles";
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
  // ACT 6 
  useEffect(() => {
    setRows(categories);
  }, [categories]);
  // ACT 6
  const handleEditItem = ()=> {

  };
  const handleDeleteItem = ()=> {
    
  };

  return (
    <PageContainer container>
      Categories Page
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        //Add category (Icon button)
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* ACT 6  */}
        <DenseTable rows={rows}/>
      </Grid>
      //Modal
    </PageContainer>
  );
}

export default CategoriesPage;
