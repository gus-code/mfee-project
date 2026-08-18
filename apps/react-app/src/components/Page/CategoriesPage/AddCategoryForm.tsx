import { useState, useEffect } from "react";
import { validator } from "../../../common/utils";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, SelectChangeEvent } from "@mui/material";
import { AddCategoryFormProps, CategoryInput, NewCategory} from "apps/react-app/src/types";

export const emptyInputs: CategoryInput = {
  category: { value: "", error: "" },
}


function AddCategoryForm ({open, setOpen, onSave, initialData}:AddCategoryFormProps) {
  const [ categoryData, setCategoryData] = useState<CategoryInput>(emptyInputs);

  useEffect(() => {
    if (open) {
      setCategoryData(
        initialData
          ? { category: { value: initialData.name, error: "" } }
          : emptyInputs
      );
    }
  }, [open, initialData]);

  const handleClose = () => {
    setCategoryData(emptyInputs);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const inputs = Object.values(categoryData);
    const containError = inputs.map((input) => input.error).some((v) => !!v);
    if (containError) return;
  
    const newCategory: NewCategory = {
      category: categoryData.category.value
    };

    onSave(newCategory);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) =>{
    const  {name, value} = e.target;
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
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
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      [name]: { ...prevCategoryData[name as keyof CategoryInput], error },
    }));
  };


  return(
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      {/* Title */}
      <DialogTitle>
        {initialData ? "Edit category" : "Add category"}
      </DialogTitle>
      {/* Form content */}
      <DialogContent>
        <TextField 
          required
          fullWidth
          id="category"
          name="category"
          label="category"
          type="text"
          value={categoryData.category.value}
          error={!!categoryData.category.error}
          helperText={categoryData.category.error ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </DialogContent>
      {/* Buttons */}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">{initialData ? "Update" : "Save"}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCategoryForm;