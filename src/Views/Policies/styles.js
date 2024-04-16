import { Box, ListItemText, Typography, styled } from "@mui/material";
import { specialFont } from "../../Infrastructure/Theme/fontFamily";

export const styles = {
  listItemText: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: 400,
    fontFamily: "Inter",
  },
  heading: {
    fontFamily: `${specialFont} !important`,
    fontSize: "30px",
    fontWeight: 400,
    lineHeight: "51px",
    textDecoration: "none",
  },
};
export const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
}));
export const MainSubContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
}));

export const Heading = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.primary.main,
  paddingTop: theme.spacing(5),
}));
export const Title = styled(Typography)(({ theme }) => ({
  color: "black",
  textAlign: "center",
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(0),
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: "black",
  padding: theme.spacing(3),
  textAlign: "justify",
  textAlignLast: "center",
  fontSize: "16px",
  width: "90%",
  wordWrap: "wrap",
}));

export const ItemText = styled(ListItemText)(({ theme }) => ({
  fontSize: "20px",
  fontFamily: "Inter",
}));
export const PrivacyLinks = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "underline"
}));
