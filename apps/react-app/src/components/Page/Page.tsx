import React from "react";
import Grid from "@mui/material/Grid";
import NavBar from "../NavBar";

interface PageProps {
  /**
   * The page component that will be rendered inside the global Page component template
   */
  page: React.JSX.Element;
}

/**
 * The global page template which wraps the page component (provided as a prop) in the global site template/header/footer
 */
export default function Page({ page }: PageProps): React.JSX.Element {
  return (
    <Grid container id="app" direction="column" height="100vh" wrap="nowrap">
      <NavBar />
      <Grid
        container
        item
        wrap="nowrap"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 84px)",
        }}
      >
        {page}
      </Grid>
    </Grid>
  );
}
