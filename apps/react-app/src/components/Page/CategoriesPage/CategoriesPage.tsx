import { Grid, Box, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import React, { useState } from 'react'

import { PageContainer } from "./CategoriesPage.styles";
import { useQuery, useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../App'

import AddIcon from '@mui/icons-material/Add';
import { CategoryTable } from "../../Table/Table";
import { getAllCategories, updateCategory, createCategory, deleteCategory } from '../../../api/endpoints/categories';
import { Category } from '../../../types';


// ACT 9 - Use the getList, create, edit, delete and update categories APIs

function CategoriesPage() {
  const { data: rows = [], isLoading } = useQuery({
    queryFn: getAllCategories,
    queryKey: ['categories']
  })

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      })
    },
  })

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  })

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newName, setNewName] = useState('');

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  }

  const handleEdit = (id: string) => {
    const cat = (rows as Category[]).find((c) => c.id === id);
    setEditId(id);
    setEditName(cat?.name ?? '');
    setOpenEdit(true);
  };

  const handleEditSave = () => {
    if (!editId || !editName) return;
    updateMutation.mutate({ id: editId, name: editName });
    setOpenEdit(false);
    setEditId(null);
    setEditName('');
  };

  const handleAdd = () => {
    if (!newName.trim()) return;
    createMutation.mutate(newName.trim());
    setNewName('');
  };

  // const handleDeleteItem = () => {
  //   return;
  // }
  

  // ACT 6 - Create a state called "rows"
  // ACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value.
  //ACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem"
  return (
    <PageContainer container>
      Categories Page

      <p>{editId}</p>
      <Grid item sx={{ justifyContent: "flex-end", display: "flex" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Add category"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <IconButton color="primary" aria-label="add" onClick={handleAdd} disabled={isLoading}>
            <AddIcon />
          </IconButton>
        </Box>
        {/* ACT 8 - Use the IconButton component (from MUI) to open the Modal */}
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/* ACT 6 - Create a component called "Table" to display category names */}
        {isLoading ? (
          <div>Loading categories...</div>
        ) : (
          <>
            <CategoryTable categories={rows} onEdit={handleEdit} onDelete={handleDelete} />
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
              <DialogTitle>Edit category</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  fullWidth
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                <Button onClick={handleEditSave} disabled={isLoading} variant="contained">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Grid>
      {/* ACT 8 - Create a Modal to add new categories and update existing ones */}
    </PageContainer>
  );
}

export default CategoriesPage;
