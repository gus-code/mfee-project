import { PageContainer } from "./LoginPage.styles"
import { Grid } from "@mui/material";

function LoginPage() {
    return (
        <PageContainer container>
            Login Page
            <Grid item md={4} xs={4} lg={4}>
                Form
            </Grid>
        </PageContainer>
    )
}

export default LoginPage;

