import { Box, Typography, styled } from "@mui/material";
export const styles={
  backdrop: {
    backgroundColor: "transparent", // Set the backdrop background color to transparent
  },
}
export const LoginSigUpTextLink = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.primary.main,
  cursor: "pointer",

  [theme.breakpoints.down("md")]: {},
}));
export const LoginMainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  border: "1px solid black",
  borderRadius: "50px",
  width: "358px",
  height: "437px",
  backgroundColor: "white",
  paddingBottom: 5,
  [theme.breakpoints.down("md")]: {},
}));
export const LoginFormBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  [theme.breakpoints.down("md")]: {},
}));
export const ModalBackgroundBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(5px)",
  zIndex: 1,
  [theme.breakpoints.down("md")]: {},
}));