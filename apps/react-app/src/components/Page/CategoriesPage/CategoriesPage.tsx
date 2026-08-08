import { useState, useEffect} from "react";
import { Grid } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { PageContainer } from "./CategoriesPage.styles";
import { Category } from "../../../types";

const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel" },
  { id: "663fef70d513515319546d1f", name: "Food" },
];


function CategoriesPage() {
  // ListoACT 6 - Create a state called "rows"
  const [rows, setRows] = useState<Category[]>([]);
  // ListoACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value.
  useEffect(() => {
    setRows(categories);
  }, []);

  // ListoACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem"
  function handleEditItem () {}
  function handleDeleteItem () {}

  return (
    <PageContainer container>
      Categories Page
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        //Add category (Icon button)
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* ListoACT 6 - Create a component called "Table" to display category names */}
        <TableCategory />
      </Grid>
      //Modal
    </PageContainer>
  );
}

export default CategoriesPage;

function TableCategory (){
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Post category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}