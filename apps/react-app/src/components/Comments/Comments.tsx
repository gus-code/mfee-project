import { Comment } from '../../types';
import CommentCard from '../CommentCard';
import { Title, Container } from './Comments.styles';

interface Comments {
  comments: Comment[];
}

function Comments({ comments }: Comments) {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {comments.length > 0 && <CommentCard comment={comments[0]} />}
    </Container>
  );
}

export default Comments;
