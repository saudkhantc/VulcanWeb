import { styled } from "@mui/material";

export const Message = styled("p")(({ theme }) => ({
  textAlign:"center",
  fontSize: "26px",
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },
}));
