import * as React from "react";
import Button from "@mui/material/Button";
import "./Button.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: "#029E7F",
      light: "#E1F2E5",
      dark: "#055F4D",
      contrastText: "#FFFFFF",
    },
  },
});

export const CustomButton = ({
  color = "primary",
  variant = "contained",
  className = "",
  buttonText,
  size = "",
  onClick,
  type = "button",
  disabled,
  startIcon,
  endIcon,
  errors = "",
}) => {
  return (
    <ThemeProvider theme={theme}>
    <Button
      type={type}
      className={`default ${className} ${size}`}
      onClick={onClick}
      color={color}
      variant={variant}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {buttonText}
    </Button>
    </ThemeProvider>
  );
};
