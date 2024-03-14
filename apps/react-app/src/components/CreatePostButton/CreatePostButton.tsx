import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

import { Container } from './CreatePostButton.styles';

interface CreatePostButton {
  handleOpenForm: () => void;
}

const CreatePostButton = ({ handleOpenForm }: CreatePostButton) => {
  return (
    <Container item>
      <IconButton
        color="primary"
        onClick={() => {
          handleOpenForm();
        }}
      >
        <EditIcon />
      </IconButton>
    </Container>
  );
};

export default CreatePostButton;
