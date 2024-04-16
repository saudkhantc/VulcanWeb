import { Box, IconButton } from "@mui/material";
import {
  AboutDownArrow,
  AuthButton,
  MenuStyle,
  SmNavlink,
  Span,
} from "./styles";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../../../Infrastructure/config";
import { RiAccountCircleLine as AccountCircleIcon } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { resetSteps } from "../../../../../Infrastructure/States/educatorStepsSlice";
import { resetCoursesSteps } from "../../../../../Infrastructure/States/coursesStepsSlice";

export const DropdownSmallScreen = ({ handleCloseNavMenu }) => {
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleLogout = () => {
    setAnchorElNav(null);
    handleCloseNavMenu();
    dispatch(resetSteps());
    dispatch(resetCoursesSteps());
    auth.signOut();
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/account"
    ) {
      navigate("/");
    }
  };
  const handleClose = () => {
    setAnchorElNav(null);
    handleCloseNavMenu();
  };
  return (
    <>
      <Box>
        <IconButton
          size="large"
          edge="end"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircleIcon />
        </IconButton>
        <AboutDownArrow theme="secondary" />
      </Box>
      <MenuStyle
        id="menu-appbar"
        anchorEl={anchorElNav}
        keepMounted
        mt={3}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleClose}
        PaperProps={{
          className: "css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper",
          sx: {
            borderRadius: "20px !important",
          },
        }}
      >
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ pl: "10px", pr: "10px" }}
          >
            <Span>
              <SmNavlink
                onClick={() => {
                  navigate("/dashboard");
                  handleClose();
                }}
                variant="body2"
                curser="pointer"
              >
                Dashboard
              </SmNavlink>
            </Span>
            <Span>
              <SmNavlink
                onClick={() => {
                  navigate("/account");
                  handleClose();
                }}
                variant="body2"
              >
                Account
              </SmNavlink>
            </Span>
          </Box>
          <Box display="flex" justifyContent="center" pt="20px" pb="10px">
            <AuthButton signup="true" onClick={handleLogout}>
              Logout
            </AuthButton>
          </Box>
        </Box>
      </MenuStyle>
    </>
  );
};
