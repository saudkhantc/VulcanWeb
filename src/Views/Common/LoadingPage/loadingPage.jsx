import React from "react";
import { Container, CircularProgress } from "@mui/material";

const LoadingPage = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default LoadingPage;
