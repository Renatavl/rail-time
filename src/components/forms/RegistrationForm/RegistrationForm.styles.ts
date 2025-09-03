import { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  paper: { p: 4, maxWidth: 550, mx: "auto" },
  title: { mb: 4, fontWeight: 600, textAlign: "center" },
  form: {
    width: "100%",
    display: "flex",
    gap: "10px",
    flexDirection: "column",
  },
  submit: { mt: 1 },
};
