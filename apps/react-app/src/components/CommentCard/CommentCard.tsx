import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";
import { Comment } from "../../types";

function CommentCard(props: { comment: Comment; }) {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Author>
          { props.comment.author }
        </Author>
        <Typography>
          { props.comment.content }
        </Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
