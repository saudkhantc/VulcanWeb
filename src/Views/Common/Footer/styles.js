import { Box, styled } from "@mui/material";
// import theme from '../../../Infrastructure/Theme/themes'
export const styles = {
  // Sub Grid 1
  subGrid1Box: { pt: 1, pb: 0, display: "flex" },
  subGrid1BoxTypo: {
    fontSize: { lg: "30px", sm: "27px", xs: "21px" },
    fontWeight: "400",
    marginTop: { lg: "4px", xs: "0" },
  },
  subGrid1Typo: {
    display: "inline-block",
    fontSize: { lg: "18px", sm: "18px", xs: "16px" },
    marginTop: { xs: "7px" },
    fontWeight: "400",
  },
  // Sub Grid 2
  subGrid2: {
    display: "flex",
    flexDirection: { lg: "row", sm: "row" },
    justifyContent: { lg: "space-around", md: "start" },
    alignItems: "center",
  },
  subGrid2Typo: {
    margin: { lg: "10px", md: "10px", sm: "6px", xs: "6px" },
    display: "inline-block",
    cursor: "pointer",
    fontSize: "18px !important",
  },

  // Sub Grid 3
  subGrid3Icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: {
      lg: "50px",
      sx: "35px",
    },
    height: {
      lg: "50px",
      sx: "35px",
    },
    padding: "5px",
    color: "blue",
    borderRadius: "10px",
    cursor: "pointer",
  },
};
export const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  border: "1px solid black",
  borderRadius: "50px",
  minWidth: "300px",
  height: "400px",
  backgroundColor: "white",
  paddingBottom: 5,
  pt: 2,
  [theme.breakpoints.down("md")]: {
    height: "300px",
  },
}));
export const FooterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  position: "relative",
  bottom:"0",
  width:"100%",
  color: "white",
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.down("md")]: {
  },
}));
