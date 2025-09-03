import { Theme } from "@mui/material";

export const styles = {
  toggleGroup: (theme: Theme) => ({
    gap: "2rem",
    "& .MuiToggleButtonGroup-firstButton, & .MuiToggleButtonGroup-middleButton":
      {
        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
      },
    "& .MuiToggleButtonGroup-lastButton, & .MuiToggleButtonGroup-middleButton":
      {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderLeft: `1px solid ${theme.palette.divider}`,
      },
    "& .MuiToggleButtonGroup-lastButton.Mui-disabled, & .MuiToggleButtonGroup-middleButton.Mui-disabled":
      {
        borderLeft: `1px solid ${theme.palette.action.disabledBackground}`,
      },
    mb: 2,
  }),
  actionsBox: {
    display: "flex",
    justifyContent: "flex-end",
    mb: 2,
  },

  actionsStack: {
    width: { xs: "100%", sm: "auto" },
  },

  formControl: {
    minWidth: { xs: "100%", sm: 220 },
  },

  textField: {
    minWidth: { xs: "100%", sm: 260 },
  },

  tablePaper: {
    borderRadius: 2,
    overflow: "hidden",
  },

  tableRoot: {
    "& th": {
      bgcolor: "grey.50",
      color: "text.secondary",
      fontWeight: 600,
    },
    "& td, & th": { borderBottomColor: "grey.200" },
  },
};
