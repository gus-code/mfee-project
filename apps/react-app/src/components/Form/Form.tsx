import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { Category, NewPost, Post } from "../../types";
import { validator } from "../../common/utils";
import { PostContext } from "../../context";
import { FormInputs, Inputs } from "../../types";

const inputs: Inputs = [
  {
    id: "title-id",
    name: "title",
    label: "Title",
    type: "text",
  },
  {
    id: "description-id",
    name: "description",
    label: "Description",
    type: "text",
  },
  {
    id: "category-label",
    name: "category",
    label: "Category",
    type: "menu",
    options: [
      { id: "663fef70d513515319551d1f", name: "Travel" },
      { id: "663fef70d513515319546d1f", name: "Food" },
    ],
  },
  {
    id: "url-id",
    name: "image",
    label: "URL of the image",
    type: "url",
  },
];

const emptyInputs: FormInputs = {
  title: { value: "", error: "" },
  description: { value: "", error: "" },
  category: { value: "", error: "" },
  image: { value: "", error: "" },
};

interface FormProps {
  open: boolean;
  post?: Post | null;
  categories: Category[] | null;
  selectedCategory: Category | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPost: (value: React.SetStateAction<Post | null>) => void;
}

const Form = ({
  open,
  post,
  categories,
  selectedCategory,
  setOpen,
  setSelectedPost,
}: FormProps) => {

  const [formData, setFormData] = React.useState(emptyInputs);
  const { addPost, updatePostData } = React.useContext(PostContext);

  React.useEffect(() => {
    if (!post) return;
    const existingPost = {
      title: { value: post.title, error: "" },
      description: { value: post.description, error: "" },
      category: { value: post.category?._id ?? "", error: "" },
      image: { value: post.image, error: "" },
    };
    setFormData(existingPost);
  }, [post]);

  const handleClose = () => {
    setFormData(emptyInputs);
    setOpen(false);
    setSelectedPost(null);
  };

  const hanldeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputs = Object.values(formData);
    const containError = inputs.map((input) => input.error).some((v) => !!v);
    if (containError) return;

    const newPost: NewPost = {
      title: formData.title.value,
      image: formData.image.value,
      description: formData.description.value,
      category: formData.category.value,
    };

    handleClose();

    post
      ? await updatePostData({
          postID: post.id,
          updatedPost: newPost,
          selectedCategoryID: selectedCategory?.id,
        })
      : await addPost(newPost);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name as keyof FormInputs], error },
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: hanldeSubmit,
      }}
    >
      <DialogTitle variant="h5" textAlign="center">
        Create Post
      </DialogTitle>
      <DialogContent>
        {inputs.map((input, idx) => (
          <React.Fragment key={idx}>
            {(input.type === "text" || input.type === "url") && (
              <TextField
                required
                fullWidth
                id={input.id}
                name={input.name}
                label={input.label}
                type={input.type}
                variant="outlined"
                margin="dense"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ paddingBottom: 2 }}
                value={formData[input.name].value}
                error={!!formData[input.name].error}
                helperText={formData[input.name].error ?? " "}
              />
            )}
            {input.type === "menu" && (
              <TextField
                select
                required
                fullWidth
                sx={{ pb: 2 }}
                margin="dense"
                id={input.id}
                name={input.name}
                label={input.label}
                onChange={handleChange}
                value={`${formData[input.name].value}`}
                error={!!formData[input.name].error}
                helperText={formData[input.name].error ?? " "}
              >
                {categories?.map((option, idx) => (
                  <MenuItem value={option.id ?? option.name} key={idx}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </React.Fragment>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Form;
