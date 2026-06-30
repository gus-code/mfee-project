import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Alert, Typography } from "@mui/material";

interface LoginFormData {
  username: string;
  password: string;
}

interface Props {
  onLogin: (data: LoginFormData) => void;
  loginMessage: string | null;
  loginError: string | null;
}

const LoginForm = ({ onLogin, loginMessage, loginError }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    onLogin(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">Iniciar sesión</Typography>
      <TextField
        label="Username"
        {...register("username", { required: "El nombre de usuario es requerido" })}
        error={!!errors.username}
        helperText={errors.username?.message ?? " "}
        fullWidth
        size="small"
      />
      <TextField
        label="Password"
        type="password"
        {...register("password", { required: "La contraseña es requerida" })}
        error={!!errors.password}
        helperText={errors.password?.message ?? " "}
        fullWidth
        size="small"
      />
      <Button type="submit" variant="contained" fullWidth>
        Ingresar
      </Button>
      {loginMessage && <Alert severity="success">{loginMessage}</Alert>}
      {loginError && <Alert severity="error">{loginError}</Alert>}
    </Box>
  );
};

export default LoginForm;
