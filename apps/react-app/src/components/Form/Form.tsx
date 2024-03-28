import * as React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  FormHelperText
} from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';

import axios from '../../api/axios';
import { Post } from '../../types';
import { validator } from '../../utils';
import { PostContext, SnackbarContext } from '../../context';
import { FormInputs } from '../../types';
import { useContext } from 'react';

const emptyInputs: FormInputs = {
  title: { value: '', error: '' },
  description: { value: '', error: '' },
  category: { value: '', error: '' },
  image: { value: '', error: '' }
};

interface FormProps {
  open: boolean;
  post?: Post | null;
  categorySelected: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPost: (value: React.SetStateAction<Post | null>) => void;
}

const Form = ({ open, post, categorySelected, setOpen, setSelectedPost }: FormProps) => {
  const [formData, setFormData] = React.useState(emptyInputs);
  const { getPosts } = useContext(PostContext);
  const { createAlert } = useContext(SnackbarContext);

  React.useEffect(() => {
    if (!post) return;
    const existingPost = {
      title: { value: post.title, error: '' },
      description: { value: post.description, error: '' },
      category: { value: post.category, error: '' },
      image: { value: post.image, error: '' }
    };
    setFormData(existingPost);
  }, [post]);

  const handleClose = () => {
    setFormData(emptyInputs);
    setOpen(false);
    setSelectedPost(null);
  };

  const hanldeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputs = Object.values(formData);
    const containError = inputs.map((input) => input.error).some((v) => !!v);
    if (containError) return;

    const newPost: Post = {
      id: post?.id ?? Math.random().toString(),
      title: formData.title.value,
      image: formData.image.value,
      description: formData.description.value,
      category: formData.category.value,
      comments: post?.comments ?? []
    };

    axios({
      method: post ? 'patch' : 'post',
      url: post ? `/${post.id}` : undefined,
      signal: AbortSignal.timeout(5000),
      data: newPost
    })
      .then((response: AxiosResponse) => {
        if (response.status === 200 || response.status === 201) {
          getPosts(categorySelected);
          handleClose();
          createAlert('success', post ? 'Post updated successfully!' : 'Post created successfully!');
        }
      })
      .catch((error: AxiosError) => {
        createAlert('error', 'Something went wrong!');
        console.error(`${error}`);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { value, error: '' }
    }));
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    const error = validator({ name, value });
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name as keyof FormInputs], error }
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: hanldeSubmit
      }}
    >
      <DialogTitle variant="h5" textAlign="center">
        Create Post
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          id="title-id"
          name="title"
          label="Title"
          type="text"
          variant="standard"
          margin="dense"
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ paddingBottom: 2 }}
          value={formData.title.value}
          error={!!formData.title.error}
          helperText={formData.title.error ?? ' '}
        />
        <TextField
          required
          fullWidth
          id="description-id"
          name="description"
          label="Description"
          type="text"
          variant="standard"
          margin="dense"
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ paddingBottom: 2 }}
          value={formData.description.value}
          error={!!formData.description.error}
          helperText={formData.description.error ?? ' '}
        />
        <FormControl fullWidth sx={{ paddingBottom: 2 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            required
            labelId="category-label"
            id="category-id"
            label="Category"
            name="category"
            variant="standard"
            margin="dense"
            onBlur={handleBlur}
            onChange={handleChange}
            value={formData.category.value}
            error={!!formData.category.error}
          >
            <MenuItem value={'Health'}>Health</MenuItem>
            <MenuItem value={'Travel'}>Travel</MenuItem>
            <MenuItem value={'Sports'}>Sports</MenuItem>
          </Select>
          <FormHelperText>{formData.category.error}</FormHelperText>
        </FormControl>
        <TextField
          required
          fullWidth
          id="url-id"
          name="image"
          label="URL of the image"
          type="url"
          variant="standard"
          margin="dense"
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{ paddingBottom: 2 }}
          value={formData.image.value}
          error={!!formData.image.error}
          helperText={formData.image.error ?? ' '}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Form;
