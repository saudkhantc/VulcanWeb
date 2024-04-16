import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { GiTeacher } from "react-icons/gi";
import { MdLocalLibrary as LocalLibraryIcon} from "react-icons/md";
import { Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { MyBox, styles } from "./styles";
import DialogBox from "../../Common/DialogBox/dialogBox";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { useTheme } from '@mui/material/styles';

const WelcomeBox = ({ userData }) => {
  const theme = useTheme();
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const uid = auth?.currentUser?.uid;
  const is_educator = userData?.is_educator
  const [open, setOpen] = React.useState(false);
  const message = "Educator Onboarding Complete";
  const [isClicked, setIsClicked] = useState(true);
  const onboardingComplete = userData?.educator?.onboarding_complete;
  const handleButtonClick = (val) => {
    if (val.value === 1) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };
  const navigateToBecomeEdu = async () => {
    if (!uid) {
      navigate("/educator-account");
      const userRef = ref(db, `users/${uid}/educator`);
      await update(userRef, {
        onboarding_complete: false
      })
    }
    if (is_educator) {
      if (onboardingComplete) {
        setOpen(true);
      } else {
        navigate("/educator-account");
        const userRef = ref(db, `users/${uid}/educator`);
        await update(userRef, {
          onboarding_complete: false
        })
      }
    } else {
      setOpen(true);
    }
  };
  const navigateToCourses = () => {
    navigate("/courses");
  };
  return (
    <>
      <DialogBox open={open} setOpen={setOpen} message={is_educator ? message : "Students are not able to be teachers."} />
      <Grid container item sx={styles.mainGrid}>
        <MyBox sx={styles.item}>
          <Grid
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid
              onClick={(e) => handleButtonClick({ value: 1 })}
              sx={styles.subGrid}
            >
              {isClicked ? (
                <GiTeacher size={'3.1875rem'} color={theme.palette.primary.main} />
              ) : (
                <GiTeacher size={'3.1875rem'} />
              )}
              <Box>
                <Typography variant="body5">Teach</Typography>
                {isClicked ? (
                  <Divider sx={styles.dividerAfterClick} />
                ) : (
                  <Divider sx={styles.dividerbeforeClick} />
                )}
              </Box>
            </Grid>
            <Divider sx={styles.dividerStyle} />
            <Grid
              onClick={(e) => handleButtonClick({ value: 2 })}
              sx={styles.subGrid}
            >
              {isClicked ? (
                <LocalLibraryIcon size={'3.1875rem'} />
              ) : (
                <LocalLibraryIcon size={'3.1875rem'} color={theme.palette.primary.main} />
              )}
              <Box>
                <Typography variant="body5">Learn</Typography>
                {isClicked ? (
                  <Divider sx={{ ...styles.dividerbeforeClick, color: (theme) => theme.palette.primary.main }} />
                ) : (
                  <Divider sx={styles.dividerAfterClick} />
                )}
              </Box>
            </Grid>
          </Grid>
          {isClicked ? (
            <>
              <Typography variant="body2">
                Become an Educator <br /> on the Vulcan Platform
              </Typography>
              <Typography variant="body5" sx={styles.boxDescription}>
                Teach live online classes on any subject matter of your
                expertise. Keep 100% of the earnings.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body2">
                Enroll in a Course <br /> on the Vulcan Platform
              </Typography>
              <Typography variant="body5" sx={styles.boxDescription}>
                Learn directly from subject matter experts in live classes.
                Courses available soon.
              </Typography>
            </>
          )}

          <Box display="flex" justifyContent="center" mt={6} height={40}>
            {isClicked ? (
              <Button
                onClick={navigateToBecomeEdu}
                variant="contained"
                sx={styles.textCapitalize}
              >
                Sign Up To Teach
              </Button>
            ) : (
              <Button
                onClick={navigateToCourses}
                variant="contained"
                sx={styles.textCapitalize}
              >
                See Courses
              </Button>
            )}
          </Box>
        </MyBox>
      </Grid>
    </>
  );
};

export default WelcomeBox;
