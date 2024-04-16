import { Box, Paper, Typography, styled } from "@mui/material";
import { specialFont } from "../../Infrastructure/Theme/fontFamily";

export const styles = {
  mainGrid1: { p: { xs: 0, sm: 0, lg: 1, md: 1 }, width: "100%" },
  boxTypoHeading: { pb: 4, pt: 2 },
  boxTypoDescription: { borderRadius: "20px" },
  linkText: { textDecoration: "underline", cursor: "pointer" },
};

export const Item = styled(Paper)(({ is_small_screen }) => ({
  textAlign: "start",
  height: is_small_screen ? 300 : 266,
  width: is_small_screen ? 350 : 414,
  borderRadius: `${20} !important`,
  fontSize: 24,
  padding: 20,
  border: "1px solid black",
}));

export const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

export const TextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6),
    paddingLeft: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(6),
  },
}));

export const Header = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontFamily: `${specialFont} !important`,
  color: theme.palette.primary.main,
}));

export const Paragraph = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
}));

export const Image = styled("img")({
  maxWidth: "100%",
  height: "auto",
});

export const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "50%",
      height: "100%",
      backgroundImage: `linear-gradient(270deg,
        rgba(255, 255, 255, 0) 11%,
        rgba(255, 255, 255, 1.801558) 100%)`,
      zIndex: 1,
    },
  },
}));
