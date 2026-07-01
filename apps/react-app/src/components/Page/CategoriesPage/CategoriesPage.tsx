import { Grid } from "@mui/material";

import { PageContainer } from "./CategoriesPage.styles";
// import { Category } from "../../../types";

// const categories: Category[] = [
//   { id: "663fef70d513515319551d1f", name: "Travel" },
//   { id: "663fef70d513515319546d1f", name: "Food" },
// ];

function CategoriesPage() {
  // ACT 6 - Create a state called "rows"
  // ACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value.

  //ACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem"
  return (
    <PageContainer container>
      Categories Page
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        //Add category (Icon button)
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* ACT 6 - Create a component called "Table" to display category names */}
      </Grid>
      //Modal
    </PageContainer>
  );
}

export default CategoriesPage;
