import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CategoriesResponse } from '../../types';

interface Props {
  rows: CategoriesResponse[];
  headCells: GridColDef[];
}

export const Table = ({ rows, headCells }: Props) => {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={ rows }
        columns={ headCells }
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

