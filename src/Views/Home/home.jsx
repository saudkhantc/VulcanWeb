import "./home.css";
import React from "react";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import WelcomeBox from "./WelcomeBox/welcomeBox";
import mobileImage from "../../Assets/Images/backhome.png";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const HomeScreen = () => {
  const theme = useTheme();
  const is_desktop = useMediaQuery(theme.breakpoints.up("sm"));
  const userData = useSelector((state) => state.userData.data);
  return (
    <>
        <Grid>
          {is_desktop ? (
            <Box sx={styles.box} className="home">
              <WelcomeBox userData={userData} />
            </Box>
          ) : (
            <>
              <Box component="div">
                <WelcomeBox userData={userData} />
              </Box>
              <Box component="div" className="" sx={{ overflow: "hidden" }}>
                <img src={mobileImage} width={"100%"} height={"auto"} alt="" />
              </Box>
            </>
          )}
        </Grid>
    </>
  );
};

export default HomeScreen;
