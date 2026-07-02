import { Title, Container, FormContainer } from "./Comments.styles";

import CommentCard from "../CommentCard"
import { Comment } from "../CommentCard/CommentCard";

{ /* ACT 3 */}
export interface commentsProps{
  comments: Comment[]
}

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

function Comments( {comments}:commentsProps) {
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
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
        <CommentCard comment={commentsArr[0]}/> {/* ACT 3 */}
        {/* ACT 5 */}
        {comments.map((comment) => {
          return  <CommentCard  comment={comment}/>;
        })}
      <FormContainer item sm={8}>
        Form
      </FormContainer>
    </Container>
  );
}

export default Comments;
