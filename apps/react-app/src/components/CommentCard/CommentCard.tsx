import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

// const comment = {
//   _id: "",
//   author: "",
//   content: "",
//   createdAt: "",
//   updatedAt: "",
//   __v: "",
// }; // ACT 1 - Fill all the properties with random data

export interface CommentType {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CommentCardProps {
  comment: CommentType
}

function CommentCard(  {comment} : CommentCardProps) {
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
