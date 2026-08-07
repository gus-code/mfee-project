import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Alert, Typography } from "@mui/material";
import { UserLogin } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/endpoints/auth";
import { queryClient } from "../../App";
import { useNavigate } from "react-router-dom";

interface LoginFormData extends UserLogin {};
const LoginForm = () => {


  const navigate = useNavigate();
  const loginMessage = 'Succeed'
  const loginError = 'Username or password might be incorrrect'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const registerMuatation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      });
      navigate('/')
    },
  })

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    registerMuatation.mutate(data)
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
      {registerMuatation.isSuccess && <Alert severity="success">{loginMessage}</Alert>}
      {registerMuatation.isError && <Alert severity="error">{loginError}</Alert>}
    </Box>
  );
};

export default LoginForm;
