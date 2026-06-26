import { Grid } from "@mui/material";

import { PageContainer } from "./CategoriesPage.styles";

function CategoriesPage() {
  return (
    <PageContainer container>
      Categories Page
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        {/* //Add category (Icon button) */}
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* //Table */}
      </Grid>
      {/* //Modal */}
    </PageContainer>
  );
}

export default CategoriesPage;
