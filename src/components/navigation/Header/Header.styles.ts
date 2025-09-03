import { SxProps, Theme } from "@mui/material/styles";

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    position: "sticky",
    top: 0,
    bgcolor: "#fafafa",
  },
  inner: {
    maxWidth: 1200,
    mx: "auto",
    p: "15px 0px 15px 16px",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontWeight: 700,
    fontSize: 22,
    mr: 6,
    whiteSpace: "nowrap",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: { xs: 2, sm: 5, md: 8 },

    a: {
      color: "#fff",
      letterSpacing: 0.4,
      fontWeight: 600,
      "&:hover": { bgcolor: "transparent", opacity: 0.9 },
      p: 0,
    },
  },
};
