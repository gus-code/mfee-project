import CommentCard from "../CommentCard/CommentCard";
import { Title, Container, FormContainer } from "./Comments.styles";

function Comments() {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/* ACT 1 = Render CommentCard component (Done)*/
      <CommentCard />
      }
      <FormContainer item sm={8}>
        Form
      </FormContainer>
    </Container>
  );
}

export default Comments;
