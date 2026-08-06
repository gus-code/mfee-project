import { Grid } from "@mui/material";
import { PageContainer } from "./LoginPage.styles";

function LoginPage() {
  return (
    <>
      <PageContainer container>
        Login Page
        <Grid item md={4} xs={4} lg={4}>
          Form
        </Grid>
      </PageContainer>
    </>
  );
}

// ListoACT 2 - Export LoginPage component
export default LoginPage;