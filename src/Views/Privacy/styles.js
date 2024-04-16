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
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "0px",
}));
export const MainSubContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  padding: "10px",
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

  padding: "10px",

  fontSize: "24px",
  fontWeight: 600,
  lineHeight: 1.2,
  fontFamily: "'Inter', sans-serif",
}));
export const Subtitle = styled(Typography)(({ theme }) => ({
  color: "black",
  textAlign: "center",
  fontSize: "24px",
  lineHeight: 1.2,
  fontFamily: "'Inter', sans-serif",
  padding: "10px",
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: "black",
  textAlign: "justify",
  textAlignLast: "center",
  padding: "10px",
  fontSize: "16px",
  width: "90%",
}));

export const ItemText = styled(ListItemText)(({ theme }) => ({
  fontSize: "20px",
  fontFamily: "Inter",
}));
