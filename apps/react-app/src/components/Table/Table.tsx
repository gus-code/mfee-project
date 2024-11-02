import { Category } from "../../types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import {Paper} from "@mui/material";

interface TableProps{
    headers: string[],
    categories: Category[] | null,
    handleDeleteItem: (id: string) => void,
    handleEdit: (category: Category) => void;
}

function TableComponent({headers, categories, handleDeleteItem, handleEdit}:TableProps){

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map(header => {
                            return <TableCell>{header}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories?.map(category => {
                        return (
                            <TableRow>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                    <IconButton sx={{alignSelf: 'center'}} onClick={() => handleDeleteItem(category.id)}><DeleteIcon/></IconButton>
                                    <IconButton sx={{alignSelf: 'center'}} onClick={() => handleEdit(category)}><EditIcon/></IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableComponent;