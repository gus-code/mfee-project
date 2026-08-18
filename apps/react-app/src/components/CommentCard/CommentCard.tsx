import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

import { Comment } from "../../types";

// ListoACT 3 - Receive comment prop
function CommentCard({_id, author, content, createdAt, updatedAt, __v}:Comment) {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        {/* ListoACT 1 - Render comment author */}
        <Author>{author}</Author>
        {/* ListoACT 1 - Render comment content */}
        <Typography>{content}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
