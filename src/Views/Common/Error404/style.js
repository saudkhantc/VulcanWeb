import { styled } from "@mui/system";
import { Typography, Button, Container } from "@mui/material";

export const ErrorContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  }));
  
 export  const ErrorCode = styled(Typography)(({ theme }) => ({
    fontSize: "6rem",
  }));
  
 export  const ErrorMessage = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  }));
  
 export  const HomeButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "#0000FF",
    },
  }));