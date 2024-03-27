import { Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  comment: string;
}

function AddCommentForm() {
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
    console.log(data.comment);
  };

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
