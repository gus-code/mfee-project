import { PageContainer } from "./ProfilePage.styles";
import { Grid } from "@mui/material";
import LogoutButton from "./LogoutButton";

const ProfilePage = () => {
  return (
    <PageContainer container>
      <h1>Welcome Back !</h1>
      <Grid item md={4} xs={4} lg={4}>
        <h2>Explora las categorias.</h2>
        <p>Puedes añadir, editar o borrar categorías en la sección "Categories"</p>
        <h2>Explora un post</h2>
        <p>Puedes ver un post en la sección "Post", o ver uno diferente añadiendo a la url "posts/[id]"</p>
        <h2>¿Quieres cerrar sesión?</h2>
        <LogoutButton />
      </Grid>
    </PageContainer>
  );
};

export default ProfilePage;
