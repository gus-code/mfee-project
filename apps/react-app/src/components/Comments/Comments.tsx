import { Title, Container } from './Comments.styles';
import CommentCard from '../CommentCard';

interface CommentsProps{
  postComments:Comment[];
} 

function Comments({ postComments }:CommentsProps) {
  console.log(typeof postComments, 'postComments1212121');
  console.log(postComments, 'postCommentsmmmmmm');
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/* Activity 4 - Render CommentCard only if comments array is greater than zero */}
      {/* Activity 5 - Iterate comments */}
      {/* Activity 3 - Send comment prop */}
      <CommentCard comment={postComments[0]} />
    </Container>
  );
}

export default Comments;
