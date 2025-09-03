"use client";

import {
  Paper,
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { styles } from "./RegistrationForm.styles";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FormikTextField } from "@/components/ui-components/FormikTextField/FormikTextField";
import { useState } from "react";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required("First Name is required"),
  lastName: Yup.string().trim().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 symbols")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

export default function RegisterForm() {
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const initialValues: Values = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const submitRegistrationForm = async (
    values: Values,
    helpers: FormikHelpers<Values>
  ) => {
    try {
      await axios.post("/api/auth/register", {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      const status = err.response?.status;
      const message = err.response?.data?.message || "Failed to sign up";

      if (status === 409) {
        helpers.setFieldError("email", "Email already in use");
        return;
      }

      toast.error(message);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Paper elevation={2} sx={styles.paper}>
      <Typography variant="h4" sx={styles.title}>
        Sign up form
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitRegistrationForm}
      >
        {({ isSubmitting }) => (
          <Box component={Form} noValidate sx={styles.form}>
            <FormikTextField
              name="firstName"
              label="First Name"
              placeholder="Enter Your First Name"
              autoComplete="given-name"
            />

            <FormikTextField
              name="lastName"
              label="Last Name"
              placeholder="Enter Your Last Name"
              autoComplete="family-name"
            />

            <FormikTextField
              name="email"
              label="Email"
              placeholder="Enter Your Email"
              autoComplete="email"
            />

            <FormikTextField
              name="password"
              label="Password"
              placeholder="Enter Your Password"
              autoComplete="new-password"
              type={showPw ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPw((v) => !v)}
                        edge="end"
                      >
                        {showPw ? <VisibilityOff /> : <Visibility />}{" "}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <FormikTextField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Your Password"
              autoComplete="new-password"
              type={showPw2 ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPw2((v) => !v)}
                        edge="end"
                      >
                        {showPw2 ? <VisibilityOff /> : <Visibility />}{" "}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={styles.submit}
              disabled={isSubmitting}
            >
              Sign up
            </Button>
          </Box>
        )}
      </Formik>
    </Paper>
  );
}
