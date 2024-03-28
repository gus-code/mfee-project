import { Button, TextField } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Comment, Post } from '../../types';
import { useContext, useEffect } from 'react';
import { PostContext, SnackbarContext } from '../../context';
import axios from '../../api/axios';

interface IFormInput {
  comment: string;
}

function AddCommentForm() {
  const { post, getPost } = useContext(PostContext);
  const { createAlert } = useContext(SnackbarContext);
  
  const comment: Comment = {
    id: Math.random().toString(),
    author: 'Anonymus',
    content: ''
  };

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      comment: ''
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    comment.content = data.comment;
    post?.comments.push(comment);
    axios({
      method: 'patch',
      url: `/${post?.id}`,
      signal: AbortSignal.timeout(5000),
      data: post
    })
      .then((response: AxiosResponse) => {
        if (response.status === 200 || response.status === 201) {
          createAlert('success', 'Comment created successfully!');
        }
      })
      .catch((error: AxiosError) => {
        createAlert('error', 'Something went wrong!');
        console.error(`${error}`);
      });
  };

  useEffect(() => {
    getPost('1.24');
  }, []);

  return (
    <>
      <form>
        <TextField
          variant="filled"
          fullWidth
          label="Comment"
          multiline
          placeholder="Type something…"
          margin="normal"
          error={errors.comment?.type === 'required' || errors.comment?.type === 'minLength'}
          helperText={
            (errors.comment?.type === 'required' && 'Comment is required') ||
            (errors.comment?.type === 'minLength' && 'Comment must be at least 5 characteres')
          }
          {...register('comment', { required: true, minLength: 5 })}
        />

        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </form>
    </>
  );
}

export default AddCommentForm;
