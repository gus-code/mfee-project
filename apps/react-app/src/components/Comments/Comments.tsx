import { Title, Container } from "./Comments.styles";
import CommentCard from "../CommentCard";

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
