import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

<<<<<<< HEAD
const comment = {
  _id: "013943",
  author: "Valeria",
  content: "I had an amazing experience traveling there too!",
  createdAt: "08-06-2026",
  updatedAt: "09-06-2026",
  __v: "0",
}; 
=======
// ACT 3 - Receive comment prop
>>>>>>> origin/react/session-02

function CommentCard() {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
<<<<<<< HEAD
        <Author>{comment.author}</Author>
        <Typography>{comment.content}</Typography>
=======
        <Author>{/* ACT 1 - Render comment author */}</Author>
        <Typography>{/* ACT 1 - Render comment content */}</Typography>
>>>>>>> origin/react/session-02
      </Content>
    </Container>
  );
}

export default CommentCard;
