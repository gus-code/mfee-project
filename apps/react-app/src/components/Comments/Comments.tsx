import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

import { Title, Container, FormContainer } from './Comments.styles';
import CommentCard from '../CommentCard/CommentCard';
import { Comment } from '../../types/index';

interface CommentsProps {
  comments: Comment[];
  handleCommentSubmition: (comment: Comment) => void;
}

function Comments({ comments, handleCommentSubmition }: CommentsProps) {
  // const [commentsArray, setCommentsArray] = useState(comments);
  const [comment, setComment] = useState('');

  function handleComment(str: string) {
    setComment(str);
  }

  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {comments.map((comment: Comment) => {
        return <CommentCard key={comment.id} author={comment.author} content={comment.content} />;
      })}
      <FormContainer item sm={8}>
        <Typography id="add-comment-heading" variant="h6" component="h2">
          Add a comment
        </Typography>
        <TextField
          fullWidth
          multiline
          required
          id="comment-body"
          label="Comment"
          rows={4}
          onChange={(e) => handleComment(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={(e) =>
            handleCommentSubmition({
              id: comments[comments.length - 1].id + 0,
              author: 'Anonymous',
              content: comment
            })
          }
        >
          Submit
        </Button>
      </FormContainer>
    </Container>
  );
}

export default Comments;
