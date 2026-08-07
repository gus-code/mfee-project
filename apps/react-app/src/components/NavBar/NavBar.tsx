import React from "react";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import {useContext} from "react";
import { AuthContext } from "../../context";

export default function NavBar(): React.JSX.Element {
  const { isAuthenticated, logout } = useContext(AuthContext);
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
      <NavLink
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <TravelExploreIcon sx={{ width: 45, height: 45 }} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" fontWeight="bold">
            Discovering the World
          </Typography>
          <Typography variant="caption" alignItems="center">
            Making your Life Easier
          </Typography>
        </Box>
      </NavLink>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: 2,
        }}
      >
        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/categories">
          <Button
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#1e8fff",
              borderRadius: "8px",
              padding: "8px",
              ".active &": {
                backgroundColor: "#75b8fa",
              },
            }}
          >
            Categories
          </Button>
        </NavLink>
        {isAuthenticated ? (
          <Button
            onClick={logout}
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "red",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            Logout
          </Button>
          ) : (
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/login">
              <Button
                sx={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#1e8fff",
                  borderRadius: "8px",
                  padding: "8px",
                  ".active &": {
                    backgroundColor: "#75b8fa",
                  }
                }}
              >
                Login
              </Button>
            </NavLink>
          )}
      </Box>
    </Grid>
  );
}
