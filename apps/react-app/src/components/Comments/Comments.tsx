import { Title, Container } from './Comments.styles';
import CommentCard from '../CommentCard';
import { Comment } from '../../types';

interface CommentsProps{
  postComments:Comment[];
} 

function Comments({ postComments }:CommentsProps) {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/* Activity 4 - Render CommentCard only if comments array is greater than zero */}
      {/* Activity 5 - Iterate comments */}
      {/* Activity 3 - Send comment prop */}
      {postComments.length>0 && <CommentCard comment={postComments[0]}/>}


      {/* <CommentCard comment={postComments[0]} /> */}
    </Container>
  );
}

export default Comments;
