import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

function CommentCard() {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Author>{/* Activity 1 - Render comment author */}</Author>
        <Typography>{/* Activity 1 - Render comment content */}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
