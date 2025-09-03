"use client";

import {
  Paper,
  Box,
  Stack,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { styles } from "./LoginForm.styles";
import { FormikTextField } from "@/components/ui-components/FormikTextField/FormikTextField";
import { toast } from "react-toastify";
import { useState } from "react";

type Values = { email: string; password: string };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 symbols")
    .required("Password is required"),
});

export default function LoginForm() {
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();

  async function handleLoginSubmit(
    values: Values,
    helpers: FormikHelpers<Values>,
    router: ReturnType<typeof useRouter>
  ) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Failed to sign in");
        return;
      }

      toast.success("Successfully signed in");
      router.push("/");
    } catch {
      toast.error("Something went wrong. Please try again");
    } finally {
      helpers.setSubmitting(false);
    }
  }

  return (
    <Box>
      <Typography sx={styles.title}>Welcome back!</Typography>
      <Paper elevation={2} sx={styles.formWrapper}>
        <Typography sx={styles.formTitle}>Sign in form</Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, helpers) =>
            handleLoginSubmit(values, helpers, router)
          }
        >
          {({ isSubmitting }) => (
            <Box component={Form} noValidate>
              <Stack spacing={2}>
                <FormikTextField
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                />

                <FormikTextField
                  name="password"
                  label="Password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPw((v) => !v)}
                            edge="end"
                          >
                            {showPw ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button
                  sx={styles.btn}
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign in
                </Button>
              </Stack>
            </Box>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
