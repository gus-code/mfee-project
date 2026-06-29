import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

const comment = {
  _id: "013943",
  author: "Valeria",
  content: "I had an amazing experience traveling there too!",
  createdAt: "08-06-2026",
  updatedAt: "09-06-2026",
  __v: "0",
}; 

function CommentCard() {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Author>{comment.author}</Author>
        <Typography>{comment.content}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
