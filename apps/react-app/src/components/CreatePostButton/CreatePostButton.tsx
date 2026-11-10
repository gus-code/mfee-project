import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

import { Post } from "../../types";
import { Container } from "./CreatePostButton.styles";

interface CreatePostButtonInterface {
  handleOpenForm: (defaultValues?: Post) => void;
}

const CreatePostButton = ({ handleOpenForm }: CreatePostButtonInterface) => {
  return (
    <Container item>
      <IconButton color="primary" onClick={() => handleOpenForm()}>
        <EditIcon />
      </IconButton>
    </Container>
  );
};

export default CreatePostButton;
