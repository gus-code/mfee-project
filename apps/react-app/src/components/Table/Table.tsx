import React from 'react';
import { Category } from "../../types";
import {
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TableProps {
  categories: Category[];
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const CategoryTable = ({ categories, onEdit, onDelete }: TableProps) => {
  return (
    <TableContainer component={Paper} elevation={2} sx={{ mt: 2 }}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">ID</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Category</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((c) => (
            <TableRow key={c.id} hover>
              <TableCell sx={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {c.id}
              </TableCell>
              <TableCell>{c.name}</TableCell>
              <TableCell align="right">
                <IconButton size="small" aria-label={`edit-${c.id}`} onClick={() => onEdit(c.id)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" aria-label={`delete-${c.id}`} onClick={() => onDelete && onDelete(c.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};