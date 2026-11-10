import { Title, Container, FormContainer } from "./Comments.styles";

import CommentCard from '../CommentCard';

interface CommentItem {
  _id: string,
  author: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  __v: string,
}

interface CommentsProps {
  comments: CommentItem[];
}

function Comments({comments}: CommentsProps) {

  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment}/>
      ))}
      <FormContainer item sm={8}>
        {/* ACT 8 - Create a form to add comments */}
      </FormContainer>
    </Container>
  );
}

export default Comments;
