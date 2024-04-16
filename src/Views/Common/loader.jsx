import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const Loader = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
};
