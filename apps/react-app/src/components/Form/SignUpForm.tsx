import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Alert } from "@mui/material";
import { NewUser } from "../../types";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../App";
import { registerUser } from "../../api/endpoints/auth";

interface SignUpFormData extends NewUser {
  confirmPassword: string;
}

export const SignUpForm = () => {

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const registerMessage = 'Account created, please log in'
  const registerError = 'There was an error while creating your account'

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<SignUpFormData>();

  const password = watch("password", "");

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    // Type transformation
    const { confirmPassword, ...user } = data;
    registerMutation.mutate(data);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", gap: 2, alignItems: "flex-start", flexDirection: "column", width: "100%" }}
    >
      <TextField
        label="First Name"
        {...register("firstname", { required: "First name is required" })}
        fullWidth
        size="small"
        error={!!errors.firstname}
        helperText={errors.firstname?.message ?? " "}
      />
      <TextField
        label="Last Name"
        {...register("lastname", { required: "Last name is required" })}
        fullWidth
        size="small"
        error={!!errors.lastname}
        helperText={errors.lastname?.message ?? " "}
      />
      <TextField
        label="Username"
        {...register("username", { required: "Username is required" })}
        fullWidth
        size="small"
        error={!!errors.username}
        helperText={errors.username?.message ?? " "}
      />
      <TextField
        label="Password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        })}
        type="password"
        fullWidth
        size="small"
        error={!!errors.password}
        helperText={errors.password?.message ?? " "}
      />
      <TextField
        label="Confirm Password"
        {...register("confirmPassword", {
          required: "Confirm password is required",
          validate: (value) => value === password || "Passwords do not match",
        })}
        type="password"
        fullWidth
        size="small"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message ?? " "}
      />
      <Button type="submit" variant="contained" size="small">
        Sign up
      </Button>
      {isSubmitted && Object.keys(errors).length > 0 && (
        <Alert severity="error" style={{ width: "100%" }}>
          All fields are required
        </Alert>
      )}

      {registerMutation.isSuccess && <Alert severity="success">{registerMessage}</Alert>}
      {registerMutation.isError && <Alert severity="error">{registerError}</Alert>}
    </Box>
  );
};

export default SignUpForm;