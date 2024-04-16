import {styled } from "@mui/material";

export const AuthButton = styled("button")(({ theme, signup }) => ({
  borderRadius: "30px",
  border: "1px solid black",
  fontFamily: "Inter, sans-serif",
  fontWeight: 800,
  height: "40px",
  width: "80px",
  background: signup ? theme.palette.primary.main : "#fff",
  color: signup ? "#fff" : theme.palette.secondary,

  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
}));
