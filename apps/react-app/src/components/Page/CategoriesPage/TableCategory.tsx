import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Category, TableCategoryProps } from "../../../types";



function TableCategory (
    { categoriesList, onEdit, onDelete,
    }: TableCategoryProps & {onEdit: (category: Category) => void;onDelete: (categoryId: string) => void;
    }
){
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Post category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoriesList.map((category) => (
            <TableRow
              key={category._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(category._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableCategory;