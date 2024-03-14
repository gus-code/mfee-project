import CommentCard from '../CommentCard';
import { Title, Container } from './Comments.styles';
import { Comment } from '../../types';

interface CommentsProps {
  postComments: Comment[];
}

function Comments({ postComments }: CommentsProps) {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {postComments.length > 0 && postComments.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
    </Container>
  );
}

export default Comments;
