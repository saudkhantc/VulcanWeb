import React, { useRef } from "react";
import "./becomeEducator.css";
import { Box } from "@mui/system";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import MoneyIcon from "../../Assets/Images/moneyIcon.png";
import SharingIcon from "../../Assets/Images/sharingIcon.png";
import TeachIcon from "../../Assets/Images/teachIcon.png";
import becomeimg from "../../Assets/Images/becomeEducatorBgImg.png";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import Auth from "../../Views/Common/AuthModals/authModals";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import DialogBox from "../Common/DialogBox/dialogBox";
import { Loader } from "../Common/loader";

const BecomeEducator = () => {
  const auth = getAuth();
  const db = getDatabase();
  const theme = useTheme();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const uid = auth?.currentUser?.uid;
  const [open, setOpen] = React.useState(false);
  const message = "Educator Onboarding Complete";
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const userData = useSelector((state) => state.userData.data);
  const loading = useSelector((state) => state.userData.loading);
  const onboardingComplete = userData?.educator?.onboarding_complete;
  const chooseModal = useSelector((state) => state.auth.chooseModal);
 const is_educator = userData?.is_educator

  const navigateToBecomeEdu = async() => {
    if(!uid){
      navigate("/educator-account");
      const userRef = ref(db, `users/${uid}/educator`);
      await update(userRef,{
        onboarding_complete: false
      })
    }
    if(is_educator){
    if (onboardingComplete) {
      setOpen(true);
    } else {
      navigate("/educator-account");
      const userRef = ref(db, `users/${uid}/educator`);
      await update(userRef,{
        onboarding_complete: false
      })
    }
  }else{
    setOpen(true);
  }
  };
  const navigateToEdu = () => {
    navigate("/educator-faq");
  };
  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Section 1 */}
          <DialogBox open={open} setOpen={setOpen} message={is_educator ? message : "Students are not able to be teachers."} />
          {<Auth chooseModal={chooseModal} />}
          <div className={isDesktop ? "bg-img" : "bg-img2"}>
            <Grid container lg={6} sx={styles.Sec1MainGrid}>
              <Grid>
                <Typography align="center" sx={styles.boxTypo}>
                  Teach Live Classes Online
                </Typography>
                <Typography align="center" sx={styles.boxContent}>
                  Become an Educator on the Vulcan Platform. Enrich lives. Earn
                  income.
                </Typography>
              </Grid>
              <Grid
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-around"
                lg={12}
                md={12}
                sm={12}
                xs={12}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={navigateToBecomeEdu}
                  sx={styles.textCapitalize}
                >
                  Get Started
                </Button>
                <Button
                  onClick={scrollToSection}
                  variant="contained"
                  size="small"
                  sx={styles.textCapitalize}
                >
                  Learn More
                </Button>
              </Grid>
            </Grid>
          </div>
          <Box>
            {!isDesktop && <img src={becomeimg} width={"100%"} alt="" />}
          </Box>
          {/* Section 2 */}
          <Box px={5}>
            <Box ref={sectionRef} sx={styles.Sec2Box}>
              <Typography sx={styles.Sec2Typo}>
                Why teach on the Vulcan Learning platform?
              </Typography>
            </Box>
            <Grid
              container
              mt={8}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                lg={4}
                sm={12}
                md={4}
                xs={12}
                sx={{
                  height: "auto",
                }}
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="center"
                marginTop={isDesktop ? "20px" : "0px"}
              >
                <Box sx={styles.subGridImgBox}>
                  <img src={MoneyIcon} alt="dollar" />
                </Box>
                <Typography sx={styles.subgridTypoHeading}>
                  Monetize Your Knowledge
                </Typography>
                <Box px={2}>
                  <Typography sx={styles.subgridTypoDescription}>
                    Generate consistent and unbounded income. Part time or Full
                    time. On the Vulcan Learning platform you keep 100% of what
                    you earn.
                  </Typography>
                </Box>
              </Grid>
              <Grid
                lg={4}
                sm={12}
                md={4}
                xs={12}
                sx={{ height: "auto" }}
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="center"
                marginTop={isDesktop ? "0px" : "40px"}
              >
                <Box sx={styles.subGridImgBox}>
                  <img src={SharingIcon} alt="" />
                </Box>
                <Typography sx={styles.subgridTypoHeading}>
                  Change Lives
                </Typography>
                <Box px={2}>
                  <Typography sx={styles.subgridTypoDescription}>
                    {" "}
                    Share your experience and help learners explore their
                    interests, gain new skills, and advance their careers.
                  </Typography>
                </Box>
              </Grid>
              <Grid
                lg={4}
                sm={12}
                md={4}
                xs={12}
                sx={{ height: "auto" }}
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="center"
                marginTop={isDesktop ? "0px" : "40px"}
              >
                <Box sx={styles.subGridImgBox}>
                  <img src={TeachIcon} alt="" />
                </Box>
                <Typography sx={styles.subgridTypoHeading}>
                  You are in control
                </Typography>
                <Box px={2}>
                  <Typography sx={styles.subgridTypoDescription}>
                    Set the course curriculum, choose the class schedule, and
                    devise the teaching strategies that work best for you.
                  </Typography>
                </Box>
              </Grid>
              <Grid lg="12" xs={12}>
                <Box display="flex" justifyContent="center" mt={10} mb={10}>
                  <Button
                    onClick={navigateToEdu}
                    variant="contained"
                    style={{ textTransform: "capitalize" }}
                  >
                    Educator FAQ
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default BecomeEducator;
