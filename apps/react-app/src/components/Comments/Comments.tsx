import { Title, Container, FormContainer } from "./Comments.styles";

// import types
import { CommentsList } from "../../types";

//import components
import CommentCard from "../CommentCard";

// ListoACT 3 - Receive comments prop

function Comments({commentsArray}:CommentsList) {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/* ListoACT 1 = Render CommentCard component */}
      {/* ListoACT 3 - Send one comment (comments[0]) as prop to CommentCard component */}
      {/* ListoACT 5 - Iterate comments to render CommentCard component for each comment */}
      {commentsArray.map((comment) => <CommentCard key={comment.id} id={comment.id} author={comment.author} content={comment.content}/>)}
      <FormContainer item sm={8}>
        Form
      </FormContainer>
    </Container>
  );
}

export default Comments;