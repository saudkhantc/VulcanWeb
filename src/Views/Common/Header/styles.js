import { Menu, Typography, styled } from "@mui/material";
import { specialFont } from "../../../Infrastructure/Theme/fontFamily";
export const styles = {
  appBar: {
    backgroundColor: "white",
    color: "blue",
    textTransform: "capitalize",
  },
  logo: {
    display: { xs: "none", md: "flex" },
    mr: 0,
    mb: 0,
    width: "70px",
    curser: "pointer",
  },
  logoTypo: {
    mb: 0,
    display: { xs: "none", md: "flex" },
    fontFamily: `${specialFont} !important`,
    fontSize: "40px",
    fontWeight: 400,
    lineHeight: "51px",
    textDecoration: "none",
  },
  menuIcon: {
    flexGrow: 1,
    display: { xs: "flex", md: "none" },
    justifyContent: { xs: "flex-end" },
  },
  menu: {
    display: { xs: "block", md: "none" },
    marginTop: "4px",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  xsLogoMainBox: {
    display: { xs: "flex", md: "none" },
    justifyContent: { xs: "flex-end", md: "none" },
    mr: 1,
  },
  xsLogo: {
    display: { xs: "flex", md: "none" },
    alignItems: { xs: "center", md: "none" },
    mr: 1,
    width: "70px",
  },
  xsLogoName: {
    mr: { xs: 0, md: 2, lg: 2, sm: 0 },
    display: { xs: "flex", md: "none" },
    alignItems: { xs: "center", md: "none" },
    flexGrow: 1,
    fontFamily: `${specialFont} !important`,
    fontWeight: 700,

    letterSpacing: ".3rem",
    textDecoration: "none",
  },
  xsMenuBox: {
    flexGrow: 1,
    display: { xs: "none", md: "flex" },
    justifyContent: "space-around",
  },
  xsNavLinkBtn: {
    ml: 4,
    border: "none",
    textTransform: "capitalize",
  },
  rightBox: { flexGrow: 1, display: { xs: "none", md: "flex" } },
  rightBoxBecomeEdLink: { ml: 2, border: "none", textTransform: "capitalize" },
};
export const NavLink = styled(Typography)(({ theme }) => ({
  color: "secondary",
  fontSize: "20px !important",
  fontWeight: "bold !important",
  lineHeight: "24px !important",
}));
export const Span = styled("span")(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
}));
export const AboutSpan = styled("span")(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  position: "relative",
}));
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
export const SmNavlink = styled(Typography)(({ theme }) => ({
  color: "#00000",
  paddingTop: theme.spacing(2),
  textTransform: "capitalize",
  textAlign: "center",
}));
export const MenuStyle = styled(Menu)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    borderRadius: "30px ",
  },
}));
