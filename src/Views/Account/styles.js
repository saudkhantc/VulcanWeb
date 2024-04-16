import { Box, Typography, styled } from "@mui/material";

export const MainBox = styled(Box)(({ theme }) => ({
  maxHeight: "110vh",
  alignItems: "flex-start",
  padding: theme.spacing(5),
  marginBottom: theme.spacing(40),
  [theme.breakpoints.down("md")]: {
    height: "100vh",
  },
}));
export const TextLabel = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  textAlign: "center",
  color: "black",
  [theme.breakpoints.down("md")]: {
    fontSize: 12,
  },
}));
export const TextValue = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: "grey",
  [theme.breakpoints.down("md")]: {
    fontSize: 12,
  },
}));
export const TextButton = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.primary.main,
  paddingRight: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    fontSize: 12,
  },
}));
export const HeadingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "24px",
  marginLeft: "24px",
}));
export const FormBox = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {},
}));
export const OldPassBox = styled(Box)(({ theme }) => ({
  width: "100%",
}));
export const Span = styled("span")(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
}));
