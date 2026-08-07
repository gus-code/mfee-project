import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useSnackbarStore } from "../../store/snackbarStore";
import { useLocation, useNavigate } from "react-router-dom";


export default function NavBar(): React.JSX.Element {

  const currRoute = useLocation();
  const showSnackbar = useSnackbarStore((s) => s.show);
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path)
  }

  return (
    <Grid
      item
      sx={{
        display: "flex",
        padding: 2,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0065c9",
        height: "84px",
      }}
    >
      <Button
        sx={{
          textDecoration: "none",
          color: "white",
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}

        onClick={() => navigate('/')}
      >
        
        <TravelExploreIcon sx={{ width: 45, height: 45 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Discovering the World
          </Typography>
          <Typography variant="caption" alignItems="center">
            Making your Life Easier
          </Typography>
        </Box>
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: 2,
        }}
      >
         {/* ACT 10 - Use NavLink to navigate to categories page and change the backgroundcolor when is active */}
        <Button
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "white",
            backgroundColor: currRoute.pathname === "/categories" ? "#0069d1" : "#1e8fff",
            borderRadius: "8px",
            padding: "8px",
          }}
          onClick={() => {
            showSnackbar("Categories clicked", "info");
            handleClick("/categories");
          }}
        >
          Categories
        </Button>

         {/* ACT 10 - Use NavLink to navigate to categories page and change the backgroundcolor when is active */}
        <Button
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "white",
            backgroundColor: currRoute.pathname === "/login" ? "#0069d1" : "#1e8fff",
            borderRadius: "8px",
            padding: "8px",
          }}
          onClick={() => handleClick("/login")}
        >
          Login
        </Button>
      </Box>
    </Grid>
  );
}
