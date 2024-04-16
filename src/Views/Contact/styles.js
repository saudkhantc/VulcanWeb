import { Box, Typography, styled } from "@mui/material";
export const styles = {
  main: {
    height: "100vh",
  },
};
export const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  border: "1px solid black",
  borderRadius: "50px",
  width: "400px",
  height: "500px",
  backgroundColor: "white",
  paddingBottom: 5,
  pt: 2,
  [theme.breakpoints.down("md")]: {
    height: "500px",
    width: "350px",
  },
}));
export const AuthButton = styled("button")(({ theme }) => ({
  borderRadius: "30px",
  border: "none",
  fontFamily: "Inter, sans-serif",
  fontWeight: 800,
  position: "relative",
  height: "41px",
  width: "200px",

  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
    marginBottom: theme.spacing(1),
  },
}));

export const SendMessage = styled("button")(({ theme }) => ({
  borderRadius: "30px",
  border: "1px solid black",
  fontFamily: "Inter, sans-serif",
  fontWeight: 800,
  position: "relative",

  height: "41px",
  width: "200px",
  background: theme.palette.primary.main,
  color: "#fff",
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
    marginTop: "30px",
  },
}));

export const Heading = styled(Typography)(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  color: theme.palette.primary.main,
  fontSize: "36px",
  [theme.breakpoints.down("md")]: {
    paddingBottom: theme.spacing(3),
  },
}));

export const FormBox = styled(Box)(({ theme }) => ({
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
