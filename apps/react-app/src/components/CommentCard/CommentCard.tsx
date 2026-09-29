import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

// ACT 1 - Fill all the properties with random data (Done)
const comment = {
  _id: "12345",
  author: "John Perez",
  content: "This is a sample comment, hello.",
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  __v: "0",
};

function CommentCard() {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Author>{/* ACT 1 - Render comment author (Done)*/
          comment.author
        }</Author>
        <Typography>{/* ACT 1 - Render comment content (Done)*/
          comment.content
        }</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
