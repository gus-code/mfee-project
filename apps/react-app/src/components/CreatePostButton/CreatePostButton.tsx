import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

import { Container } from "./CreatePostButton.styles";
import { Post } from "../../types";

interface CreatePostButtonProps{
  handleOpenForm: (defaultValues?: Post) => void;
}


const CreatePostButton = ({handleOpenForm}:CreatePostButtonProps) => {
  return (
    <Container item>
      <IconButton color="primary" onClick={() =>{
        // Activity 3 - Uncomment next line
        handleOpenForm()
      }}>
        <EditIcon />
      </IconButton>
    </Container>
  );
};

export default CreatePostButton;
