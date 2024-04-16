import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementSteps,
  incrementSteps,
  resetExperienceStepValues,
  resetSteps,
} from "../../../../Infrastructure/States/educatorStepsSlice";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ContinueButton,
  EduBlankTitle,
  ExitTypo,
  Footer,
  FormBoxEdu,
  Header,
  LoginButton,
  LogoTypo,
  PreviousButton,
  Span,
  StepsTypo,
  TopHeading,
  TopHeadingBox,
} from "../../styles";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { ShowErrorToast, ShowSuccessToast } from "../../../Common/Toast/toast";
import useAuthentication from "../../../../Infrastructure/States/onAuthStateChange";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../../Infrastructure/config";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../Common/loader";
import { useAuthValue } from "../../../../Infrastructure/States/authContext";
import './style.css'
import { VerifyEmailStep } from "./verifyEmailStep";
import ProgressBar from "../../../Common/ProgressBar/progressbar";
import { getDatabase, onValue, ref, update } from "firebase/database";

export const CreateAccountStep = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const { currentUser, setTimeActive } = useAuthValue();
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const loading = useSelector((state) => state.userData.loading);
  const steps = useSelector((state) => state.educatorSteps.steps);
  const emailVerified = currentUser?.emailVerified
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const handleDec = () => {
    if (steps > 1) {
      dispatch(decrementSteps());
    }
  };
  const handleClick = async () => {
    dispatch(incrementSteps());
  };
  const isPasswordValid = (password) => {
    const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return specialCharacters.test(password);
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reEnterPassword: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: isLoginMode ? Yup.string() : Yup.string().required("First Name"),
      lastName: isLoginMode ? Yup.string() : Yup.string().required("Last Name"),
      email: Yup.string().email("Invalid email address").required("Email"),
      password: isLoginMode ? Yup.string().min(6, "Must be 6 characters").required("Password")
        :
        Yup.string()
          .min(6, "Must be 6 characters")
          .test("special-characters", "Password must contain special characters", (value) => isPasswordValid(value))
          .required("Password"),
      reEnterPassword: isLoginMode ? Yup.string() : Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Re Enter Password."),
      phoneNumber: isLoginMode ? Yup.string() : Yup.string().required("Phone Number"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        if (isLoginMode) {
          const { email, password } = values;
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          const userRef = ref(db, `users/${user.uid}`);
          await update(userRef, {
            email_verified: user.emailVerified,
          });
          ShowSuccessToast("User Logged In Successfully.", {
            autoClose: 3000,
            theme: "light",
          });
          onValue(
            userRef,
            (snapshot) => {
              const user_data = snapshot.val();
              if (user_data?.is_educator === false) {
                navigate("/")
              }
            })
        } else {
          const { email, password, firstName, lastName, phoneNumber } = values;
          await createUserWithEmailAndPassword(auth, email, password).then(() => {
            ShowSuccessToast("Account created successfully!");
          });
          const requestData = {
            firstName: firstName,
            lastName: lastName,
            number: phoneNumber,
            isEducator: true,
          };
          if (!formik.isValid) {
            return;
          }
          const createUser = httpsCallable(functions, "createaccount");
          await createUser(requestData);
          await sendEmailVerification(auth.currentUser);
          setTimeActive(true);
        }
      } catch (error) {
        if (isLoginMode) { handleLoginErrors(error) } else { handleRegistrationErrors(error) }
      } finally {
        setIsLoading(false)
        formik.resetForm()
      }
    },
  });
  const handleToggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleRegistrationErrors = (error) => {
    if (!error) {
      return;
    }
    let errorMessage = "An unexpected error occurred. Please try again later.";
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Email already exists. Please try another email.";
        break;
      case "auth/weak-password":
        errorMessage = "Weak password. Please choose a stronger one.";
        break;
      case "auth/user-token-expired":
        errorMessage = "User session expired. Please log in again.";
        break;
      default:
        ShowErrorToast(error);
    }
    ShowErrorToast(errorMessage);
  };
  const handleLoginErrors = (error) => {
    if (!error) {
      return;
    }
    let errorMessage = "Please try again later.";
    switch (error.code) {
      case "auth/wrong-password":
        errorMessage =
          "Invalid password. Please check your password and try again.";
        break;
      case "auth/user-not-found":
        errorMessage = "User not found! Try another email.";
        break;
      case "auth/too-many-requests":
        errorMessage =
          error?.error?.message || "Too many requests. Please try again later.";
        break;
      default:
        ShowErrorToast(error);
    }
    ShowErrorToast(errorMessage);
  };
  const handleExit = () => {
    try {
      dispatch(resetExperienceStepValues());
      dispatch(resetSteps());
      navigate("/");
    } catch (err) {
      // console.log(err)
    }
  };
  const handleLoginButton = () => {
    setIsLoginMode(!isLoginMode)
    formik.resetForm();
  }
  if (emailVerified) {
    dispatch(incrementSteps())
  }
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
            <StepsTypo variant="h6">Step {steps} of 4</StepsTypo>
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
      {(user && loading) || isLoading ? <Loader /> :
        <Box py={14}>
          {!user ?
            <>
              <TopHeadingBox display={"flex"} justifyContent={"start"} flexDirection={"column"} pl={1} >
                <TopHeading variant="" my={1} width={{ md: "30%", lg: "20%", xl: "20%" }}>
                  {isLoginMode ? "Login" : " Create Account"}
                </TopHeading>
                <LoginButton onClick={handleLoginButton} width={{ md: "30%", lg: "20%", xl: "20%" }} color={"primary"}>

                  {isLoginMode ? "New? Create An Account" : "Have an account ? Login"}
                </LoginButton>
              </TopHeadingBox>
            </>
            : ""
          }
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            {!user ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FormBoxEdu p={4}>
                  {!isLoginMode ? <>
                    <TextField
                      name="firstName"
                      label={
                        formik.touched.firstName && Boolean(formik.errors.firstName)
                          ? `${formik.errors.firstName}`
                          : "First Name"
                      }
                      variant="standard"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      error={
                        formik.touched.firstName && Boolean(formik.errors.firstName)
                      }
                      InputLabelProps={{
                        style: { fontSize: 16 },
                      }}
                      InputProps={{
                        style: { fontSize: 18 },
                      }}
                      fullWidth
                    />
                    <TextField
                      name="lastName"
                      sx={{ mt: "6px" }}
                      label={
                        formik.touched.lastName && Boolean(formik.errors.lastName)
                          ? `${formik.errors.lastName}`
                          : "Last Name"
                      }
                      variant="standard"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      error={
                        formik.touched.lastName && Boolean(formik.errors.lastName)
                      }
                      InputLabelProps={{
                        style: { fontSize: 16 },
                      }}
                      InputProps={{
                        style: { fontSize: 18 },
                      }}
                      fullWidth
                    />
                  </> : ""}
                  <TextField
                    name="email"
                    sx={{ mt: "6px" }}
                    label={
                      formik.touched.email && Boolean(formik.errors.email)
                        ? `${formik.errors.email}`
                        : "Email"
                    }
                    variant="standard"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    autoComplete="username"
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    InputLabelProps={{
                      style: { fontSize: 16 },
                    }}
                    InputProps={{
                      style: { fontSize: 18 },
                    }}
                    fullWidth
                  />

                  <TextField
                    name="password"
                    sx={{ mt: "6px" }}
                    label={
                      formik.touched.password && Boolean(formik.errors.password)
                        ? formik.errors.password
                        : "Password"
                    }
                    variant="standard"
                    type={showPassword ? "password" : "text"}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    autoComplete="new-password"
                    error={
                      formik.touched.password && Boolean(formik.errors.password) &&
                      !isPasswordValid(formik.values.password)
                    }
                    InputLabelProps={{
                      style: {
                        fontSize: 16,
                      },
                    }}
                    InputProps={{
                      style: { fontSize: 18 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                  {!isLoginMode ? <>
                    <TextField
                      name="reEnterPassword"
                      sx={{ mt: "6px" }}
                      label={
                        formik.touched.reEnterPassword &&
                          formik.values.password !== formik.values.reEnterPassword
                          ? "Passwords do not match"
                          : "Re-enter Password"
                      }
                      variant="standard"
                      type={showRePassword ? "password" : "text"}
                      onChange={formik.handleChange}
                      value={formik.values.reEnterPassword}
                      autoComplete="new-Password"
                      error={
                        formik.touched.reEnterPassword &&
                        formik.values.password !== formik.values.reEnterPassword
                      }
                      InputLabelProps={{
                        style: {
                          fontSize: 16,
                        },
                      }}
                      InputProps={{
                        style: { fontSize: 18 },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleToggleRePasswordVisibility}>
                              {showRePassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                    <TextField
                      name="phoneNumber"
                      sx={{ mt: "6px" }}
                      label={
                        formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
                          ? `${formik.errors.phoneNumber}`
                          : "Phone Number"
                      }
                      variant="standard"
                      onChange={formik.handleChange}
                      type="tel"
                      autoComplete="tel"
                      value={formik.values.phoneNumber}
                      error={
                        formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
                      }
                      InputLabelProps={{
                        style: { fontSize: 16 },
                      }}
                      InputProps={{
                        style: { fontSize: 18 },
                        inputMode: "numeric",
                        onKeyPress: (event) => {
                          if (isNaN(event.key)) {
                            event.preventDefault();
                          }
                        },
                      }}
                      fullWidth
                    />
                  </>
                    : ""
                  }
                </FormBoxEdu>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {currentUser?.emailVerified ?
                  <EduBlankTitle
                    variant={isSmallScreen ? "body2" : "body1"}
                    color="initial"
                    textAlign={"center"}
                    py={15}
                  >
                    Educator Account Created Successfully Move to Next Step.
                  </EduBlankTitle>
                  :
                  <VerifyEmailStep />
                }
              </Box>
            )}
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
                    <ContinueButton
                      disabled={!currentUser?.emailVerified && currentUser}
                      variant="contained"
                      type={!user ? "submit" : "button"}
                      onClick={user ? handleClick : undefined}
                    >
                      Continue
                    </ContinueButton>
                  </Grid>
                </Grid>
              </Grid>
            </Footer>
          </Box>
        </Box>
      }
    </>
  );
};
