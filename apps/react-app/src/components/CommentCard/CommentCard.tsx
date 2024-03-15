import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Comment,Post } from "../../types";

import { Container, Content, Author } from "./CommentCard.styles";

interface CommentCardProps{
  comment:Comment;
}


function CommentCard({comment}:CommentCardProps) {
  console.log(comment,"commenttttttt")
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
