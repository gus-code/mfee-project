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
      {/* ACT 1 = Render CommentCard component */}
      {/* ACT 3 - Send one comment (comments[0]) as prop to CommentCard component */}
      {/* ACT 5 - Iterate comments to render CommentCard component for each comment */}
      <FormContainer item sm={8}>
        Form
      </FormContainer>
    </Container>
  );
}

export default Comments;
