import * as React from "react";
import { CommentsList, Comment, Input, CommentN } from "../../types";
import { validator } from "../../common/utils";
import { Title, Container, FormContainer } from "./Comments.styles";
import CommentCard from "../CommentCard";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, SelectChangeEvent } from "@mui/material";
import { Content } from "../CommentCard/CommentCard.styles";

type CommentInput = {
  author: Input,
  comment: Input,
}

type NewComment = {
  author: string;
  comment: string;
};

const emptyInputs: CommentInput ={
  author: { value: "", error: "" },
  comment: { value: "", error: "" },
}

interface CommentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (comment: NewComment) => void;
}



// ListoACT 3 - Receive comments prop
function Comments({commentsArray}:CommentsList) {
  const [ comments, setComments ] = React.useState<CommentN[]>(commentsArray);
  const [ openComment, setOpenComment] = React.useState<boolean>(false);


  const handleSave = (data:NewComment) => {
    const newComment: CommentN = {
      _id: Date.now().toString(),
      author: data.author,
      content: data.comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    };
      
    setComments((prev) => [...prev, newComment]);
    setOpenComment(false);
  };

  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      <Button onClick={() => setOpenComment(true)}>
        Add Comment
      </Button>
      {/* ListoACT 1 = Render CommentCard component */}
      {/* ListoACT 3 - Send one comment (comments[0]) as prop to CommentCard component */}
      {/* ListoACT 5 - Iterate comments to render CommentCard component for each comment */}
      {comments.map((comment) =>(<CommentCard key={comment._id} _id={comment._id} author={comment.author} content={comment.content} createdAt={comment.createdAt} updatedAt={comment.updatedAt} __v={comment.__v} />))}
      <FormContainer item sm={8}>
        {/* ListoACT 8 - Create a form to add comments */}
        <AddCommentForm
          open={openComment}
          setOpen={setOpenComment}
          onSave={handleSave}
        />
      </FormContainer>
    </Container>
  );
}

export default Comments;

const AddCommentForm = ({open, setOpen, onSave}: CommentProps) => {
  const [commentData, setCommentData] = React.useState<CommentInput>(emptyInputs);

  const handleClose = () => {
    setCommentData(emptyInputs);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const inputs = Object.values(commentData);
    const containError = inputs.map((input) => input.error).some((v) => !!v);
    if (containError) return;
  
    const newComment: NewComment = {
      author: commentData.author.value,
      comment: commentData.comment.value,
    };

    onSave(newComment);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) =>{
    const  {name, value} = e.target;
    setCommentData((prevCommentData) => ({
      ...prevCommentData,
      [name]: { value, error: "" },
    }));
  };

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    const error = validator({ name, value });
    setCommentData((prevCommentData) => ({
      ...prevCommentData,
      [name]: { ...prevCommentData[name as keyof CommentInput], error },
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      {/* Title */}
      <DialogTitle variant="h5" textAlign="center">
        Add a comment
      </DialogTitle>
      {/* Form content */}
      <DialogContent>
        <TextField 
          required
          fullWidth
          id="author"
          name="author"
          label="author"
          type="text"
          value={commentData.author.value}
          error={!!commentData.author.error}
          helperText={commentData.author.error ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField 
          required
          fullWidth
          id="comment"
          name="comment"
          label="comment"
          type="text"
          value={commentData.comment.value}
          error={!!commentData.comment.error}
          helperText={commentData.comment.error ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </DialogContent>
      {/* Buttons */}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );

}