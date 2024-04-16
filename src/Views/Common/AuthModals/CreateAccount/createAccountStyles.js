import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
export const styles = {
  main: {
    height: "100vh",
  },
  backdrop: {
    backgroundColor: "transparent",
  },
};
export const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  border: "1px solid black",
  borderRadius: "50px",
  width: "450px",
  height: "623px",
  backgroundColor: "white",
  paddingBottom: 5,
  pt: 2,
  [theme.breakpoints.down("md")]: {
    height: "723px",
  },
}));
export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  })
);
export const ToggleBtn = styled(ToggleButton)(({ theme }) => ({
  border: "none",
  fontFamily: "Inter, sans-serif",
  fontWeight: 800,
  position: "relative",
  height: "41px",
  width: "200px",
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
    marginBottom: theme.spacing(1),
    border: "1px solid black",
    borderLeft: "1px solid black !important",
  },

  "&:hover": {
    backgroundColor: "transparent",
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  "&.MuiToggleButtonGroup-grouped": {
    borderRadius: "30px !important",
  },
}));
export const ChooseAccBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#D9D9D9",
  borderRadius: "30px",
  border: "none",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    backgroundColor: "white",
  },
}));
export const CreateAccButton = styled("button")(({ theme }) => ({
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
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  color: theme.palette.primary.main,
  fontSize: "36px",
  [theme.breakpoints.down("md")]: {},
}));

export const SignUpTextLink = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.primary.main,
  cursor: "pointer",

  [theme.breakpoints.down("md")]: {},
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
export const SigUpTextLink = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.primary.main,
  cursor: "pointer",

  [theme.breakpoints.down("md")]: {},
}));
export const SignUpFormBox = styled(Box)(({ theme }) => ({
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
