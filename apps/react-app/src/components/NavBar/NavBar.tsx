import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

export default function NavBar(): React.JSX.Element {
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
      >
        <TravelExploreIcon sx={{ width: 45, height: 45 }} />
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
        <Button
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#1e8fff",
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          Categories
        </Button>
        <Button
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#1e8fff",
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          Login
        </Button>
      </Box>
    </Grid>
  );
}
