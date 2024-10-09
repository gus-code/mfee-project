import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Container, Content, Author } from './CommentCard.styles';

interface CommentCardProps {
  author: string;
  content: string;
}

function CommentCard({ author, content }: CommentCardProps) {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Author>{author}</Author>
        <Typography>{content}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
