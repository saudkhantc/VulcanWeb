import { Box, styled } from "@mui/material";

export const ModalBackgroundBox = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    backdropFilter: "blur(2px)",
    zIndex: 1,
    [theme.breakpoints.down("md")]: {},
  }));
  