import { Title, Container, FormContainer } from "./Comments.styles";
import CommentCard from "../CommentCard";
import { CommentProp } from "../CommentCard/CommentCard";
import AddCommentForm from "../Form/AddComentForm";
import { useState } from "react";

/*const comments = [
  {
    _id: "412fsfa",
  author: "José Valenzuela",
  content: "Comentario",
  createdAt: "2024-04-10 12:00:00",
  updatedAt: "2024-04-10 12:00:00",
  __v: "-v",
  }
]*/

interface CommentsProps { 
  comments: CommentProp[];
  id: string;
}


function Comments({comments, id}: CommentsProps) {

  const [commentsState, setCommentsState] = useState<CommentProp[]>(comments);
  
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {commentsState.map((comment) => {
        return  <CommentCard {...comment}/>
      })}
      {/* ACT 5 - Iterate comments to render CommentCard component for each comment */}
      <FormContainer item sm={8}>
        {/* ACT 8 - Create a form to add comments */}
        <AddCommentForm setCommentsState={setCommentsState} postId={id}/>
      </FormContainer>
    </Container>
  );
}

export default Comments;
