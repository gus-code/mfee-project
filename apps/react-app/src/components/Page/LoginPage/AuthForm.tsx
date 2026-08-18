import { useState } from "react";
import { validator } from "../../../common/utils";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, SelectChangeEvent } from "@mui/material";
import { NewAuth } from "apps/react-app/src/types";
import { AuthInput } from "apps/react-app/src/types";

const emptyInputsAuth: AuthInput = {
  username: { value: "", error: "" },
  password: { value: "", error: "" },
}

type AuthFormType = "login" | "signup";

interface AuthProps {
    formType: AuthFormType; //Determinar uso del formulario: True -> Login; False -> Signup
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSave: (login: NewAuth) => void;
}

// Forms para hacer Login o Signup
const AuthForm = ({ formType, open, setOpen, onSave}:AuthProps) => {
  const [formData, setFormData] = useState<AuthInput>(emptyInputsAuth);

  const handleClose = () => {
    setFormData(emptyInputsAuth);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const inputs = Object.values(formData);
    const containError = inputs.map((input) => input.error).some((v) => !!v);
    if (containError) return;
  
    const newAuth: NewAuth = {
        name: formData.name?.value,
        username: formData.username.value,
        password: formData.password.value,
    };

    onSave(newAuth);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) =>{
    const  {name, value} = e.target;
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
      [name]: { ...prevFormData[name as keyof AuthInput], error },
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
      <DialogTitle>
        {formType === "login" ? "Login" : "Signup"}
      </DialogTitle>

      <DialogContent>
        {formType === "signup" &&
            <TextField
                fullWidth
                id="name"
                name="name"
                label="name"
                type="text"
                value={formData.name?.value}
                error={!!formData.name?.error}
                helperText={formData.name?.error ?? ""}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        }
        {formType === "signup" &&
            <TextField
                fullWidth
                id="lastaname"
                name="lastname"
                label="lastname"
                type="text"
                value={formData.lastname?.value}
                error={!!formData.lastname?.error}
                helperText={formData.lastname?.error ?? ""}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        }
        <TextField
          required
          fullWidth
          id="username"
          name="username"
          label="username"
          type="text"
          value={formData.username.value}
          error={!!formData.username.error}
          helperText={formData.username.error ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          label="password"
          type="password"
          value={formData.password.value}
          error={!!formData.password.error}
          helperText={formData.password.error ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">{formType === "login" ? "Login" : "Signup"}</Button>
      </DialogActions>
    </Dialog>
    );
};

export default AuthForm;