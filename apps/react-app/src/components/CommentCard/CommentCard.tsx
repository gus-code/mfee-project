import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

// ACT 3 - Receive comment prop

// ACT 3 - Receive comment prop

// ACT 3 - Receive comment prop

const comment = {
  _id: "412fsfa",
  author: "José Valenzuela",
  content: "Comentario",
  createdAt: "2024-04-10 12:00:00",
  updatedAt: "2024-04-10 12:00:00",
  __v: "-v",
}; // ACT 1 - Fill all the properties with random data

export interface CommentProp {
    _id: string;
    author: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v: string;
}

function CommentCard({ _id, author, content, createdAt, updatedAt, __v }: CommentProp) {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Author>{author}</Author>
        <Typography>{content}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
