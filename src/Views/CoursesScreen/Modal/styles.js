import { mainFont } from "../../../Infrastructure/Theme/fontFamily";

export const styles = {
  typoHeading: {
    fontSize: "32",
    fontFamily: `${mainFont} !important`,
    paddingRight: "10px",
    fontWeight: "bold !important",
  },
  input: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  styleCoursesScreenModal: {
    position: "absolute",
    top: { xs: "50% ", sm: "50% ", md: "50% ", lg: "50% " },
    left: {
      xs: 195,
      sm: 400,
      md: 700,
      lg: 1050,
      xl: 880,
    },
    transform: "translate(-50%, -50%)",
    width: {
      xs: 340,
      sm: 490,
      md: 490,
      lg: 490,
      xl: 490,
    },
    height: 305,
    bgcolor: "white",
    borderRadius: "30px",
    boxShadow: 24,
    p: 4,
  },
  styleWelcomeBoxModal: {
    position: "absolute",
    top: {
      xs: 100,
      sm: 100,
      lg: 100,
    },
    left: {
      sm: 40,
      md: 100,
      lg: 180,
    },

    width: {
      lg: 500,
    },
    height: 421,
    bgcolor: "white",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
};
