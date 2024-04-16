import { Box } from "@mui/material";
import React, { useState } from "react";
import QuestionThree from "./questionThree";
import {
  incrementSteps,
  resetExperienceStepValues,
  resetSteps,
} from "../../../../Infrastructure/States/educatorStepsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ContinueButton,
  ExitTypo,
  Footer,
  Header,
  LogoTypo,
  Span,
  StepsTypo,
} from "../../styles";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import QuestionOne from "./questionOne";
import QuestionTwo from "./questionTwo";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../../Infrastructure/config";
import { ShowErrorToast } from "../../../Common/Toast/toast";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../Common/ProgressBar/progressbar";
import { Loader } from "../../../Common/loader";
import { StepsValue } from "../../../CourseCreationFlow/styles";

export const ExperienceStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const steps = useSelector((state) => state.educatorSteps.steps);
  const experienceStep = useSelector(
    (state) => state.educatorSteps.experienceStep
  );
  const handleInc = async () => {
    if (steps >= 1 && steps < 4) {
      try {
        setIsLoading(true)
        const updateexperiences = httpsCallable(
          functions,
          "updateexperiencestep"
        );
        await updateexperiences(experienceStep);
      } catch (error) {
        ShowErrorToast(error);
      } finally {
        setIsLoading(false)
        dispatch(incrementSteps());
      }
    }
  };
  const handleExit = async () => {
    try {
      const updateexperiences = httpsCallable(
        functions,
        "updateexperiencestep"
      );
      await updateexperiences(experienceStep);
      dispatch(resetExperienceStepValues());
      dispatch(resetSteps());
      navigate("/");
    } catch (err) {
      // console.log(err)
    }
  };
  return (
    <>
      <Header alignItems={"center"}>
        <Grid
          container
          display={"flex"}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Grid lg={2} md={2} sm={3} xs={3}>
            <Box
              sx={{
                borderRight: "1px solid rgba(128, 128, 128, 0.5)",
                height: "70px",
              }}
              display={"Flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Span>
                <LogoTypo color={"primary"} variant="h4" onClick={handleExit}>
                  Vulcan
                </LogoTypo>
              </Span>
            </Box>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={{
              lg: "flex-start",
              sm: "center",
              xs: "center",
            }}
            alignItems={"center"}
            lg={7}
            md={6}
            sm={6}
            xs={6}
          >
            <StepsTypo variant="h6">Step {steps} of 4 <StepsValue sx={{ color: (theme) => theme.palette.primary.main }} ml={2} style={{ paddingLeft: "10px" }}>Experience</StepsValue></StepsTypo>
          </Grid>
          <Grid
            lg={2}
            md={2}
            sm={2}
            xs={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Span>
              <ExitTypo variant="h6" color="primary" onClick={handleExit}>
                Exit
              </ExitTypo>
            </Span>
          </Grid>
        </Grid>
        <ProgressBar componentName={"eduSteps"} />
      </Header>
      {
        isLoading ? <Loader /> :
          <Box py={10}>
            <Grid
              container
              display={"flex"}
              justifyContent={"center"}
            >
              <Grid lg={4} md={6} sm={10} xs={10}>
                <Box p={3} sx={{ height: "auto" }}>
                  <Box sx={{ maxWidth: "100%" }} pt={5}>
                    <QuestionTwo />
                  </Box>
                </Box>
              </Grid>
              <Grid lg={4} md={6} sm={10} xs={10}>
                <Box p={3} sx={{ height: "auto" }}>
                  <Box sx={{ maxWidth: "100%" }} pt={5}>
                    <QuestionOne />
                  </Box>
                </Box>
              </Grid>
              <Grid lg={4} md={6} sm={10} xs={10}>
                <Box p={3} sx={{ height: "auto" }}>
                  <Box sx={{ maxWidth: "100%" }} pt={5}>
                    <QuestionThree />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
      }
      <Footer>
        <Grid container justifyContent={"space-between"} p={2}>
          <Grid>
          </Grid>
          <Grid>
            <Grid>
              <ContinueButton
                disabled={
                  !(
                    (experienceStep.inPerson ||
                      experienceStep.liveOnline ||
                      experienceStep.recordedOnline ||
                      experienceStep.mediumOther) &&
                    (experienceStep.professor ||
                      experienceStep.teacher ||
                      experienceStep.independent ||
                      experienceStep.experienceOther ||
                      experienceStep.tutor) &&
                    experienceStep.years.trim() !== ""
                  )
                }
                variant="contained"
                onClick={handleInc}
              >
                Continue
              </ContinueButton>
            </Grid>
          </Grid>
        </Grid>
      </Footer>
    </>
  );
};
