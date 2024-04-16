import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  ContinueButton,
  ExitTypo,
  Footer,
  Header,
  LogoTypo,
  PreviousButton,
  QuestionFormBox,
  QuestionName,
  Span,
  StepsTypo,
} from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementSteps,
  incrementSteps,
  resetExperienceStepValues,
  resetSteps,
} from "../../../../Infrastructure/States/educatorStepsSlice";
import { useFormik } from "formik";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../../Infrastructure/config";
import { ShowErrorToast } from "../../../Common/Toast/toast";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../Common/ProgressBar/progressbar";
import { Loader } from "../../../Common/loader";
import { StepsValue } from "../../../CourseCreationFlow/styles";

export const ReachStep = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const steps = useSelector((state) => state.educatorSteps.steps);
  const userData = useSelector((state) => state.userData.data);
  const socials = userData?.educator?.questions?.socials
  const platforms = userData?.educator?.questions?.platforms
  const social1 = socials?.social_link_1;
  const social2 = socials?.social_link_2;
  const social3 = socials?.social_link_3;
  const platform1 = platforms?.platform_link_1;
  const platform2 = platforms?.platform_link_2;
  const platform3 = platforms?.platform_link_3;

  const handleDec = async () => {
    if (steps > 1) {
      try {
        setIsLoading(true)
        const updateReachStep = httpsCallable(functions, "updatereachstep");
        await updateReachStep(formik.values);
        dispatch(decrementSteps());
      } catch (error) {
        ShowErrorToast(error);
      }finally{
        setIsLoading(false)
      }
    }
  };
  const initialValues = {
    platformLink1: platform1 || "",
    platformLink2: platform2 || "",
    platformLink3: platform3 || "",
    socialLink1: social1 || "",
    socialLink2: social2 || "",
    socialLink3: social3 || ""
  };
  // Define the isUrlValid function
  function isUrlValid(userInput) {
    if (userInput) {
      const res = userInput.match(/(https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g);
      return res !== null;
    } return true;
  }
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      platformLink1: Yup.string().test('platformLink1', 'Invalid link URL', (value) => isUrlValid(value)),
      platformLink2: Yup.string().test('platformLink2', 'Invalid link URL', (value) => isUrlValid(value)),
      platformLink3: Yup.string().test('platformLink3', 'Invalid link URL', (value) => isUrlValid(value)),
      socialLink1: Yup.string().test('socialLink1', 'Invalid link URL', (value) => isUrlValid(value)),
      socialLink2: Yup.string().test('socialLink2', 'Invalid link URL', (value) => isUrlValid(value)),
      socialLink3: Yup.string().test('socialLink3', 'Invalid link URL', (value) => isUrlValid(value)),
    }),
    onSubmit: async (values) => {
      if (steps >= 1 && steps < 4) {
        try {
          setIsLoading(true)
          const updateReachStep = httpsCallable(functions, "updatereachstep");
          await updateReachStep(values);
        } catch (error) {
          ShowErrorToast(error);
        } finally {
          setIsLoading(false)
          dispatch(incrementSteps());
        }
      }
    },
  });
  const handleExit = async () => {
    try {
      setIsLoading(true)
      const updateEducatorStep = httpsCallable(
        functions,
        "updatereachstep"
      );
      await updateEducatorStep(formik.values);
      dispatch(resetExperienceStepValues());
      dispatch(resetSteps());
      navigate("/");
    } catch (err) {
      // console.log(err)
    }finally{
      setIsLoading(false)
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
            <StepsTypo variant="h6">Step {steps} of 4 <StepsValue sx={{ color: (theme) => theme.palette.primary.main }} ml={2} style={{ paddingLeft: "10px" }}>Reach</StepsValue></StepsTypo>

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
      <Box my={12}
        height="auto">
        <form onSubmit={formik.handleSubmit}>
          {isLoading ? <Loader /> :
              <Grid
                container
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid lg={6} md={6} sm={10} xs={10}>
                  <Box p={3}>
                    <Box my={1} sx={{ height: { lg: "100px", md: "100px" } }}>
                      <QuestionName variant="h6">
                        Have you taught on any teaching platforms? (Udemy, Skillshare,
                        Wyzant, etc) Share your profile link.
                      </QuestionName>
                    </Box>
                    <QuestionFormBox>
                      <TextField
                        name="platformLink1"
                        label={
                          formik.touched.platformLink1 && Boolean(formik.errors.platformLink1)
                            ? formik.errors.platformLink1
                            : "Link 1"
                        }
                        error={formik.touched.platformLink1 && Boolean(formik.errors.platformLink1)}
                        variant="outlined"
                        placeholder="Paste your link"
                        onChange={formik.handleChange}
                        value={formik.values.platformLink1}

                        sx={{ m: "10px" }}
                        InputLabelProps={{
                          style: { fontSize: 16 },
                        }}
                        InputProps={{
                          style: { fontSize: 18 },
                        }}
                        fullWidth
                      />
                      <TextField
                        name="platformLink2"
                        label={
                          formik.touched.platformLink2 && Boolean(formik.errors.platformLink2)
                            ? formik.errors.platformLink2
                            : "Link 2"
                        }
                        error={formik.touched.platformLink2 && Boolean(formik.errors.platformLink2)}
                        variant="outlined"
                        placeholder="Paste your link"
                        onChange={formik.handleChange}
                        value={formik.values.platformLink2}
                        sx={{ m: "10px" }}
                        InputLabelProps={{
                          style: { fontSize: 16 },
                        }}
                        InputProps={{
                          style: { fontSize: 18 },
                        }}
                        fullWidth
                      />
                      <TextField
                        name="platformLink3"
                        label={
                          formik.touched.platformLink3 && Boolean(formik.errors.platformLink3)
                            ? formik.errors.platformLink3
                            : "Link 3"
                        }
                        error={formik.touched.platformLink3 && Boolean(formik.errors.platformLink3)}
                        variant="outlined"
                        placeholder="Paste your link"
                        onChange={formik.handleChange}
                        value={formik.values.platformLink3}
                        sx={{ m: "10px" }}
                        InputLabelProps={{
                          style: { fontSize: 16 },
                        }}
                        InputProps={{
                          style: { fontSize: 18 },
                        }}
                        fullWidth
                      />
                    </QuestionFormBox>
                  </Box>
                </Grid>
                <Grid lg={6} md={6} sm={10} xs={10}>
                  <Box p={3}>
                    <Box my={1} sx={{ height: { lg: "100px", md: "100px" } }}>
                      <QuestionName variant="h6">
                        Do you have any social media where you post educational
                        content? (Youtube, Tik Tok, Twitter, etc) Share your profile link.
                      </QuestionName>
                    </Box>
                    <QuestionFormBox>
                      <TextField
                        name="socialLink1"
                        label={
                          formik.touched.socialLink1 && Boolean(formik.errors.socialLink1)
                            ? formik.errors.socialLink1
                            : "Link 1"
                        }
                        error={formik.touched.socialLink1 && Boolean(formik.errors.socialLink1)}
                        variant="outlined"
                        placeholder="Paste your link"
                        onChange={formik.handleChange}
                        value={formik.values.socialLink1}
                        sx={{ m: "10px" }}
                        InputLabelProps={{
                          style: { fontSize: 16 },
                        }}
                        InputProps={{
                          style: { fontSize: 18 },
                        }}
                        fullWidth
                      />
                      <TextField
                        name="socialLink2"
                        label={
                          formik.touched.socialLink2 && Boolean(formik.errors.socialLink2)
                            ? formik.errors.socialLink2
                            : "Link 2"
                        }
                        error={formik.touched.socialLink2 && Boolean(formik.errors.socialLink2)}
                        variant="outlined"
                        placeholder="Paste your link"
                        onChange={formik.handleChange}
                        value={formik.values.socialLink2}
                        sx={{ m: "10px" }}
                        InputLabelProps={{
                          style: { fontSize: 16 },
                        }}
                        InputProps={{
                          style: { fontSize: 18 },
                        }}
                        fullWidth
                      />
                      <TextField
                        name="socialLink3"
                        label={
                          formik.touched.socialLink3 && Boolean(formik.errors.socialLink3)
                            ? formik.errors.socialLink3
                            : "Link 3"
                        }
                        error={formik.touched.socialLink3 && Boolean(formik.errors.socialLink3)}
                        variant="outlined"
                        placeholder="Paste your link"
                        onChange={formik.handleChange}
                        value={formik.values.socialLink3}
                        sx={{ m: "10px" }}
                        InputLabelProps={{
                          style: { fontSize: 16 },
                        }}
                        InputProps={{
                          style: { fontSize: 18 },
                        }}
                        fullWidth
                      />
                    </QuestionFormBox>
                  </Box>
                </Grid>
              </Grid>
          }
          <Footer>
            <Grid container justifyContent={"space-between"} p={2}>
              <Grid>
                {steps > 1 ? (
                  <PreviousButton variant="contained" onClick={handleDec}>
                    Previous
                  </PreviousButton>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid>
                <Grid>
                  <ContinueButton variant="contained" type="submit">
                    Continue
                  </ContinueButton>
                </Grid>
              </Grid>
            </Grid>
          </Footer>
        </form>
      </Box>
    </>
  );
};
