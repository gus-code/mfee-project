import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Alert } from "@mui/material";
import { NewComment } from "../../types";

interface Props {
  onAdd: (comment: NewComment) => void;
}

export const NewCommentForm = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<NewComment>();

  const onSubmit: SubmitHandler<NewComment> = (data) => {
    onAdd(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", gap: 2, alignItems: "flex-start", flexDirection: "column", width: "100%" }}>
      <TextField
        label="Author"
        {...register("author", { required: true })}
        fullWidth
        size="small"
      />
      <TextField
        label="Comment"
        {...register("content", { required: true })}
        fullWidth
        multiline
        minRows={3}
        size="small"
      />
      <Button type="submit" variant="contained" size="small">Add comment</Button>
      {isSubmitted && Object.keys(errors).length > 0 && (
        <Alert severity="error" style={{width: '100%'}}>All fields are required</Alert>
      )}
    </Box>
  );
};

export default NewCommentForm;