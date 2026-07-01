import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

{/* ACT 3 */}
export interface Comment{
  author:string,
  content:string,
}

interface commentProps{
  comment: Comment;
}

function CommentCard({comment}:commentProps) {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Author>{comment.author ? comment.author : "Unknown"}</Author>
        <Typography>{comment.content ?comment. content : "Empty Comment"}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
