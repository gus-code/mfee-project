import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Container, Content, Author } from "./CommentCard.styles";

export interface CommentType {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}




interface CommentCardProps {
  comment: CommentType;
}

function CommentCard({ comment }: CommentCardProps) {
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
