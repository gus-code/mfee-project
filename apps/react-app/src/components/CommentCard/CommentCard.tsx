import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Container, Content, Author } from "./CommentCard.styles";
import { CommentResponse } from "../../types";

interface Props {
  comment: CommentResponse
}

//✅ ACT 3 - Receive comment prop

function CommentCard( { comment }: Props ) {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Author>{ comment.author }</Author> {/*✅ ACT 1 - Render comment author */}
        <Typography>{ comment.content }</Typography> {/*✅ ACT 1 - Render comment content */}
      </Content>
    </Container>
  );
}

export default CommentCard;
