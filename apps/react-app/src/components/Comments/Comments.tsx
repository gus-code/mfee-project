import { Title, Container, FormContainer } from "./Comments.styles";
import CommentCard from "../CommentCard";
import AddCommentForm from "../AddCommentForm";

function Comments() {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/* Activity 4 - Render CommentCard only if comments array is greater than zero */}
      {/* Activity 5 - Iterate comments */}
      {/* Activity 3 - Send comment prop */}
      <CommentCard />
      <FormContainer item sm={8}>
        <AddCommentForm />
      </FormContainer>
    </Container>
  );
}

export default Comments;
