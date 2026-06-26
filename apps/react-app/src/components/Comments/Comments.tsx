import CommentCard, { CommentType } from "../CommentCard/CommentCard";
import { Title, Container, FormContainer } from "./Comments.styles";


interface CommentsProps {
  comments: CommentType[]; 
}

function Comments({ comments }: CommentsProps) {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {comments.map((comment) => (
        <CommentCard key={comment._id} {...comment} />
      ))}
      <FormContainer item sm={8}>
        Form
      </FormContainer>
    </Container>
  );
}

export default Comments;
