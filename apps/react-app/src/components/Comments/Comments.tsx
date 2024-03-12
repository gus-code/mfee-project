import CommentCard from "../CommentCard";
import { Title, Container } from "./Comments.styles";

function Comments() {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      <CommentCard/>
    </Container>
  );
}

export default Comments;
