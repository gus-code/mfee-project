import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import {Category} from '../../types';
import { IconButton } from '@mui/material';
interface categoriesTableProps{
    rows: Category[];
    onEdit: (category:Category) => void;
    onDelete: (id: string) => void;
}

export default function DenseTable({rows, onEdit, onDelete}: categoriesTableProps ) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="categories table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold"}}>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  {row.name}
                  <Box ml="auto">
                    <IconButton onClick ={() => onEdit(row)} >
                      <EditIcon/>
                    </IconButton>
                    <IconButton  onClick ={()=> onDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
