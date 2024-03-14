import CommentCard from '../CommentCard';
import { Title, Container } from './Comments.styles';
import { Comment } from '../../types';

interface CommentsProps {
  postComments: Comment[];
}

function Comments({ postComments }: CommentsProps) {
  const tempComment: Comment = postComments[0];

  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/* Activity 5 - Iterate comments */}
      {postComments.length > 0 && postComments.map((comment) => <CommentCard comment={tempComment} />)}
    </Container>
  );
}

export default Comments;
