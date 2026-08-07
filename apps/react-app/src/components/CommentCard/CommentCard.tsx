import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

const comment = {
  _id: "143",
  author: "Rosita Fresita",
  content: "So pretty!",
  createdAt: "05/08/2026",
  updatedAt: "06/08/2026",
  __v: "",
}; // ListoACT 1 - Fill all the properties with random data

function CommentCard() {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        {/* ListoACT 1 - Render comment author */}
        <Author>{comment.author}</Author>
        {/* ListoACT 1 - Render comment content */}
        <Typography>{comment.content}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
