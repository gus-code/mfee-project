import { Title, Container, FormContainer } from "./Comments.styles";

import CommentCard from "../CommentCard"
import { Comment } from "../CommentCard/CommentCard";
import { useState } from "react";

{ /* ACT 3 */}
export interface commentsProps{
  comments: Comment[]
}

function Comments( {comments}:commentsProps) {
  const [commentList, setCommentList] = useState(comments);
  const commentsArr = [
  {
    author:'Juan',
    content:'Wow Amazing.'
  },
  {
    author:'Valeria',
    content:'Love this.'
  },
  {
    author:'Paco',
    content:'Another Comment'
  },
  {
    author:'',
    content:''
  }
  ]
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const commentInput = form.elements.namedItem("comment")as HTMLTextAreaElement;

    if (!nameInput || !commentInput) return;

    const newComment = {
      author: nameInput.value,
      content: commentInput.value,
    };

    const updatedComments = commentList.concat(newComment);


    if (!newComment.content) return;
    setCommentList(updatedComments);
    nameInput.value = "";
    commentInput.value = "";
  };

  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
        <CommentCard comment={commentsArr[0]}/> {/* ACT 3 */}
        {/* ACT 5 */}
        {commentList.map((comment, index) => {
          return  <CommentCard key={index} comment={comment}/>;
        })}
      <FormContainer item sm={8}>
        {/* ACT 8 */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" placeholder="Enter your name" />
            <label htmlFor="comment"> Add your comment:</label>
            <textarea name="comment" rows={4}  placeholder="Share some of your thoughts ..." required></textarea>
            <button type="submit" >Submit</button>
          </form>
      </FormContainer>
    </Container>
  );
}

export default Comments;
