import { PageContainer } from './CategoriesPage.styles';
import { useEffect, useState } from 'react';
import { CategoriesResponse } from '../../../types';
import { Table } from '../../Table/';
import { Grid } from '@mui/material';
import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FormCategories } from '../../FormCategories';
import { deleteCategory, getCategoriesList } from '../../../api';
import { AxiosResponse } from 'axios';

// const categories: Category[] = [
//   { id: '663fef70d513515319551d1f', name: 'Travel' },
//   { id: '663fef70d513515319546d1f', name: 'Food' }
// ];

function CategoriesPage() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoriesResponse | null>(null);
  //✅ ACT 6 - Create a state called "rows"
  const [rows, setRows] = useState<CategoriesResponse[]>([
    {
      _id: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      __v: 0
    }
  ]);

  //✅ ACT 6 - Call setRows when the component is mounted for first time, use "categories" variable as new value.
  useEffect(() => {
    getCategoriesList().then((response: AxiosResponse) => {
      setRows(response.data);
    });
  }, [setRows]);
  //✅ ACT 6 - Create two empty functions called "handleEditItem" and "handleDeleteItem"
  const handleEditItem = (id: GridRowId) => () => {
    const category = rows!.find((category: CategoriesResponse) => category._id === id);
    if (category) {
      setSelectedCategory(category);
      setOpenForm(true);
    }
  };
  const handleDeleteItem = (id: GridRowId) => () => {
    deleteCategory(id as string);
  };

  const handleOpenModal = () => {
    setSelectedCategory(null);
    setOpenForm(!openForm);
  };

  const headCells: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 230 },
    { field: 'name', headerName: 'Name', width: 230 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditItem(id)} color="inherit"></GridActionsCellItem>,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteItem(id)} color="inherit"></GridActionsCellItem>
        ];
      }
    }
  ];

  //✅ ACT 9 - Use the getList, create, edit, delete and update categories APIs
  return (
    <PageContainer container>
      Categories Page
      <Grid item sx={{ justifyContent: 'flex-end', display: 'flex' }}>
        {/*✅ ACT 8 - Use the IconButton component (from MUI) to open the Modal */}
        <IconButton aria-label="add" size="small" onClick={handleOpenModal}>
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {/*✅ ACT 6 - Create a component called "Table" to display category names */}
        {rows?.length && <Table rows={rows} headCells={headCells}></Table>}
      </Grid>
      {/*✅ ACT 8 - Create a Modal to add new categories and update existing ones */}
      <FormCategories
        open={openForm}
        setOpen={setOpenForm}
        setCategories={setRows}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoriesList={rows}
      />
    </PageContainer>
  );
}

export default CategoriesPage;
