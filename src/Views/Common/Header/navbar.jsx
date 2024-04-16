import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import logo from "../../../Assets/Images/logo.svg";
import { useNavigate } from "react-router-dom";
import {
  styles,
  MenuStyle,
  Span,
  NavLink,
  SmNavlink,
  AuthButton,
  AboutSpan,
} from "./styles";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  chooseModalLogin,
  chooseModalSignUp,
} from "../../../Infrastructure/States/authModalsSlice";
import useAuthentication from "../../../Infrastructure/States/onAuthStateChange";
import AuthModals from "../../Common/AuthModals/authModals";
import { DropdownSmallScreen } from "./Dropdowns/DropdownSmallScreen/dropdownSmallScreen";
import Dropdown from "./Dropdowns/DropdownLargeScreen/dropdown";

const Navbar = () => {
  const dispatch = useDispatch();

  const chooseModal = useSelector((state) => state.auth.chooseModal);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { user } = useAuthentication();

  const handleLoginButtonClick = () => {
    dispatch(chooseModalLogin());
    handleCloseNavMenu();
  };
  const handleSignUpButtonClick = () => {
    dispatch(chooseModalSignUp());
    handleCloseNavMenu();
  };
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <AppBar sx={styles.appBar} position="sticky">
      {<AuthModals chooseModal={chooseModal} />}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={styles.logo} onClick={navigateToHome} curser="pointer">
            <Span>
              <img src={logo} className=" img-fluid" alt="" />
            </Span>
          </Box>
          <Span>
            <Typography
              noWrap
              onClick={navigateToHome}
              color="primary"
              sx={styles.logoTypo}
              curser="pointer"
              className="logo-vulcan"
            >
              Vulcan
            </Typography>
          </Span>
          
          {/* Small Devices */}
          <Box sx={styles.xsLogoMainBox}>
            <Box sx={styles.xsLogo} onClick={navigateToHome}>
              <img src={logo} className=" img-fluid" alt="" />
            </Box>
            <Typography
              variant="h5"
              noWrap
              onClick={navigateToHome}
              color="primary"
              sx={styles.xsLogoName}
            >
              Vulcan
            </Typography>
          </Box>

          {/* Small Devices */}
          <Box sx={styles.menuIcon}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => handleOpenNavMenu(e)}
              color="inherit"
              curser="pointer"
            >
              <MenuIcon color="primary" />
            </IconButton>
            <MenuStyle
              id="menu-appbar"
              anchorEl={anchorElNav}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={styles.menu}
              PaperProps={{
                className:
                  "css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper",
                sx: {
                  borderRadius: "20px !important",
                },
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ pl: "10px", pr: "10px" }}
              >
                {/* small screen */}
                <AboutSpan display={"flex"}>
                  <SmNavlink
                    variant="body2"
                    onClick={() => {
                      navigate("/about");
                      handleCloseNavMenu();
                    }}
                  >
                    About
                  </SmNavlink>
                </AboutSpan>

                <SmNavlink
                  onClick={() => {
                    navigate("/how-it-works");
                    handleCloseNavMenu();
                  }}
                  variant="body2"
                >
                  How it Works
                </SmNavlink>

                <SmNavlink
                  onClick={() => {
                    navigate("/courses");
                    handleCloseNavMenu();
                  }}
                  variant="body2"
                >
                  Courses
                </SmNavlink>

                <SmNavlink
                  onClick={() => {
                    navigate("/become-educator");
                    handleCloseNavMenu();
                  }}
                  variant="body2"
                >
                  Become Educator
                </SmNavlink>
              </Box>
              {/* Small Screen */}
              <Box display="flex" justifyContent="space-around" pt="20px">
                {user ? (
                  <DropdownSmallScreen
                    handleCloseNavMenu={handleCloseNavMenu}
                  />
                ) : (
                  <>
                    <AuthButton onClick={handleLoginButtonClick}>
                      Login
                    </AuthButton>

                    <AuthButton onClick={handleSignUpButtonClick} signup="true">
                      Sign Up
                    </AuthButton>
                  </>
                )}
              </Box>
            </MenuStyle>
          </Box>
          <Box sx={styles.xsMenuBox}>
            {/* Large Screen */}
            <Span onClick={() => navigate("/about")}>
              <NavLink color="secondary">About</NavLink>
            </Span>
            <Span onClick={() => navigate("/how-it-works")}>
              <NavLink color="secondary">How it Works</NavLink>
            </Span>
            <Span onClick={() => navigate("/courses")}>
              <NavLink color="secondary">Courses</NavLink>
            </Span>
          </Box>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={styles.rightBox}
          >
            <Stack direction="row" spacing={2}>
              <Span onClick={() => navigate("/become-educator")}>
                <NavLink color="secondary"> Become Educator</NavLink>
              </Span>

              {user ? (
                <Dropdown />
              ) : (
                <>
                  <AuthButton onClick={handleLoginButtonClick}>
                    Login
                  </AuthButton>

                  <AuthButton signup="true" onClick={handleSignUpButtonClick}>
                    Sign Up
                  </AuthButton>
                </>
              )}
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
