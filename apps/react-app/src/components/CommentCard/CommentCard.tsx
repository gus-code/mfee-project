import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Container, Content, Author } from './CommentCard.styles';

// const comment = {
//   id: '2.1',
//   author: 'Anonymus',
//   content:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
// };

interface CommentCardProps {
  comment: {
    id: string;
    author: string;
    content: string;
  };
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
