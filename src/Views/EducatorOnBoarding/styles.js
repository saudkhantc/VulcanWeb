import { styled } from "@mui/system";
import { specialFont } from "../../Infrastructure/Theme/fontFamily";
import { Box, Button, Typography } from "@mui/material";

export const Span = styled("span")(({ theme }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
}));
export const EduMainBox = styled(Box)((theme) => ({}));
export const Header = styled(Box)((theme) => ({
  height: "70px",
  width: "100%",
  position: "fixed",
  top: 0,
  background: "white",
  zIndex: 50,
  boxShadow:
    "0px 4px 4px rgba(0, 0, 0, 0.25), 0px -4px 4px rgba(0, 0, 0, 0.25)",
}));
export const ContinueButton = styled(Button)((theme) => ({
  borderRadius: "0px",
  textTransform: "capitalize",
  border: "none",
  height: "50px",
}));
export const PreviousButton = styled(Button)((theme) => ({
  borderRadius: "0px",
  textTransform: "capitalize",
  border: "none",
  height: "50px",
}));
export const StepsTypo = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 1.4,

  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));
export const ExitTypo = styled(Typography)(({ theme }) => ({
  curser: "pointer",
  fontWight: "700 !important",
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    fontSize: "25px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));
export const LogoTypo = styled(Typography)(({ theme }) => ({
  fontFamily: `${specialFont} !important`,
  fontWight: "700 !important",
  textDecoration: "none",
  mb: 0,
  display: { md: "flex" },
  fontSize: "40px",
  lineHeight: "51px",
  [theme.breakpoints.down("md")]: {
    fontSize: "25px",
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));
export const Footer = styled(Box)(({ theme }) => ({
  height: "80px",
  width: "100%",
  position: "fixed",
  bottom: "0px",
  boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.25)",
  background: "white",
  zIndex: "1",
}));
export const TitleText = styled(Typography)((theme) => ({
  fontSize: "16px",
  fontFamily: specialFont,
}));
export const AboutMe = styled(Typography)((theme) => ({
  fontSize: "16px",
  fontFamily: specialFont,
}));
export const FullName = styled(Typography)((theme) => ({
  fontSize: "28px",
}));
export const TopHeadingBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {},
}));
export const LoginButton = styled(Typography)(({ theme }) => ({
  marginTop: 12,
  fontWeight: 500,
  fontSize: "1.3rem",
  lineHeight: 1.25,
  letterSpacing: "-.05rem",
  cursor:"pointer",
  textDecoration:"underline", 
  [theme.breakpoints.down("sm")]: {
  },
}));
export const TopHeading = styled(Typography)(({ theme }) => ({
  // marginTop: 12,
  fontWeight: 700,
  fontSize: "1rem",
  // lineHeight: 1.25,
  // letterSpacing: "-.05rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));
export const Description = styled(Typography)(({ theme }) => ({}));
export const DescriptionBox = styled(Box)(({ theme }) => ({
  maxWidth: "70%",
  paddingTop: 32,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));
export const QuestionName = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  fontSize: "24px",
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "16px",
  },
}));
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
  justifyContent: "center",
  width: "450px",
  backgroundColor: "white",
  paddingBottom: 5,
  pt: 2,
  [theme.breakpoints.down("md")]: {},
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
export const CharacterCount = styled("p")(({ theme }) => ({
  fontsize: "22px",
  textAlign: "end",
  fontWeight: "bold",
}));
export const FormBox = styled(Box)(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
export const ChoiceTypo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: "-.02rem",
  fontSize: "16px",
}));
export const EduBlankTitle = styled(Typography)(({ theme }) => ({
  fontSize: "28px",
  [theme.breakpoints.down("md")]: {
    fontSize: "24px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));
export const QuestionFormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
}));
export const FormBoxEdu = styled(Box)(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
export const AvatarBox = styled(Box)((theme) => ({
  position: "absolute",
  borderRadius: "30px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  backgroundColor: "white",
}));

export const VerifyEmailMainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "358px",
  height: "390px",
  backgroundColor: "white",
  paddingBottom: 5,
}));
export const VerifyEmailFormBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));
export const CountText = styled('span')(({ theme }) => ({
  display: "inline-block",
  width: "40px",
  textAlign: "left"
}));
export const ErrorBlockLarge = styled('h6')(({ theme }) => ({
  display: "block",
  color: "red",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
export const ErrorBlockSmall = styled('h6')(({ theme }) => ({
  display: "none",
  color: "red",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));