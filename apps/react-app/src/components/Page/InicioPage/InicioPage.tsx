import { PageContainer } from "./InicioPage.styles";
import { Grid } from "@mui/material";

const InicioPage = () => {
  return (
    <PageContainer container>
      <h1>Welcome</h1>
      <Grid item md={4} xs={4} lg={4}>
        <h2>Inicia sesión para ver posts</h2>
      </Grid>
    </PageContainer>
  );
};

export default InicioPage;
