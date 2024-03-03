import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

import { Container } from "./CreatePostButton.styles";

const CreatePostButton = () => {
  return (
    <Container item>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
    </Container>
  );
};

export default CreatePostButton;
