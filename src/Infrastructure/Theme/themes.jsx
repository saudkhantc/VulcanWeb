import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920,
      mobile: 360,
      tablet: 768,
      laptop: 1024,
      desktop: 1440,
    },
  },
  palette: {
    primary: {
      main: "#000080",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    myVariant: {
      fontsize: "6rem",
    },
    h1: {
      fontSize: "40px",
      fontWeight: 600,
      lineHeight: 1.2,
      fontFamily: "'Audiowide', sans-serif",
    },
    h5: {
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: 1.2,
      fontFamily: "'Inter', sans-serif",
    },
    h6: {
      fontSize: "24px",
      fontWeight: "bold",
      lineHeight: 1.2,
      fontFamily: "'Inter', sans-serif",
    },
    subtitle1: {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: 1.2,
      fontFamily: "'Inter', sans-serif",
    },
    subtitle2: {
      fontSize: "20px",
      fontWeight: 0,
      lineHeight: 1.2,
      fontFamily: "'Inter', sans-serif",
    },
    body1: {
      fontWeight: 700,
    },
    body2: {
      fontSize: "26px",
      fontWeight: 600,
      lineHeight: 1.2,
      fontFamily: "Inter",
    },
    body3: {
      fontSize: "20px",
      fontWeight: 400,
      fontFamily: "Inter",
    },
    body4: {
      fontSize: "32px",
      fontWeight: 700,
      color: "primary.main",
      lineHeight: 1.2,
      fontFamily: "Inter",
    },
    body5: {
      fontSize: "18px",
      fontWeight: 600,
      color: "#00000",
      lineHeight: "22px",
      fontFamily: "Inter",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          border: "1px solid black",
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          height: "40px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#0000FF",
          height: 1,
          width: 50,
          margin: "16px 0",
          opacity: 1,
        },
      },
    },
  },
});

export default theme;
