import { Field, FieldProps } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

type FormikTextFieldProps = TextFieldProps & {
  name: string;
};

export const FormikTextField = ({ name, ...props }: FormikTextFieldProps) => (
  <Field name={name}>
    {({ field, meta }: FieldProps) => {
      const showError = meta.touched && Boolean(meta.error);
      return (
        <TextField
          fullWidth
          {...field}
          {...props}
          error={showError}
          helperText={showError ? meta.error : " "}
        />
      );
    }}
  </Field>
);
