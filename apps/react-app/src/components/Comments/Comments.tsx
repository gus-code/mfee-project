import { Comment } from '../../types';
import AddCommentForm from '../AddCommentForm';
import CommentCard from '../CommentCard';
import { Title, Container, FormContainer } from './Comments.styles';

interface Comments {
  comments?: Comment[];
}

function Comments({ comments }: Comments) {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {comments && comments.length > 0 &&
        comments?.map((comment: Comment) => {
          return <CommentCard key={comment.id} comment={comment} />;
        })}
      <FormContainer item sm={8}>
        <AddCommentForm />
      </FormContainer>
    </Container>
  );
}

export default Comments;
