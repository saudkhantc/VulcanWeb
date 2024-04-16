import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ShowErrorToast, ShowSuccessToast } from "../../Toast/toast";
import {
  chooseModalEmailVerify,
  chooseModalLogin,
  closeChooseModal,
} from "../../../../Infrastructure/States/authModalsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ChooseAccBox,
  CreateAccButton,
  FormBox,
  Heading,
  MainBox,
  SignUpTextLink,
  StyledToggleButtonGroup,
  ToggleBtn,
  styles,
} from "./createAccountStyles";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { httpsCallable } from "firebase/functions";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { functions, auth } from "../../../../Infrastructure/config";
import { useAuthValue } from "../../../../Infrastructure/States/authContext";

export const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpenModal = useSelector((state) => state.auth.isOpenModal);
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const [isEducator, setIsEducator] = useState(false);
  const { setTimeActive } = useAuthValue();

  const handleCloseModal = () => {
    dispatch(closeChooseModal());
    formik.resetForm();
  };
  const handleLoginButtonClick = () => {
    dispatch(chooseModalLogin());
    formik.resetForm();
  };
  const handleChangeEducator = (event, newAlignment) => {
    if (newAlignment !== null) {
      setIsEducator(newAlignment);
    }
  };
  const isPasswordValid = (password) => {
    const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return specialCharacters.test(password);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };
  const handleRegistrationError = (error) => {
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
        dispatch(chooseModalLogin());
        break;
      default:
        ShowErrorToast(error);
    }
    ShowErrorToast(errorMessage);
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reEnterPassword: "",
      phoneNumber: "",
      isEducator: isEducator,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name"),
      lastName: Yup.string().required("Last Name"),
      email: Yup.string().email("Invalid email address").required("Email"),
      password: Yup.string()
      .min(6, "Must be 6 characters")
      .test("special-characters", "Password must contain special characters", (value) => isPasswordValid(value))
      .required("Password"),
      reEnterPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Re Enter Password."),
      phoneNumber: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const { email, password, firstName, lastName, phoneNumber } = values;
        await createUserWithEmailAndPassword(auth, email, password).then(() => {
          ShowSuccessToast("Account created successfully!");
        });
        const requestData = {
          firstName: firstName,
          lastName: lastName,
          number: phoneNumber,
          isEducator: isEducator,
        };
        if (!formik.isValid) {
          return;
        }
        const createUser = httpsCallable(functions, "createaccount");
        await createUser(requestData);
        if (!auth.currentUser.emailVerified) {
          await sendEmailVerification(auth.currentUser);
          dispatch(chooseModalEmailVerify());
          setTimeActive(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        handleRegistrationError(error);
      }
    },
  });
  const handleEducatorButton = () => {
    navigate('./educator-account')
    dispatch(closeChooseModal());
    formik.resetForm();
  }
  return (
    <Box>
      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        BackdropProps={{
          sx: styles.backdrop,
        }}
      >
        <MainBox>
          <Box
            onClick={handleCloseModal}
            sx={{
              position: "relative",
              top: "9px !important",
              right: {
                md: "-187px",
                sm: "-159px",
                xs: "-159px",
              },
            }}
          >
            <CloseIcon />
          </Box>
          <Heading variant="h1">Create Account</Heading>
          <Box>
            <SignUpTextLink variant="h6" onClick={handleLoginButtonClick}>
              Already have an account? Log In
            </SignUpTextLink>
          </Box>
          <FormBox component="form" onSubmit={formik.handleSubmit} noValidate>
            <ChooseAccBox>
              <StyledToggleButtonGroup
                color="primary"
                value={isEducator}
                exclusive
                onChange={handleChangeEducator}
                aria-label="Platform"
              >
                <ToggleBtn type="button" value={false}>
                  Student Account
                </ToggleBtn>
                <ToggleBtn
                  type="button"
                  value={true}
                  onClick={handleEducatorButton}
                >
                  Educator Account
                </ToggleBtn>
              </StyledToggleButtonGroup>
            </ChooseAccBox>
            <TextField
              name="firstName"
              label={
                formik.touched.firstName && Boolean(formik.errors.firstName)
                  ? `${formik.errors.firstName}`
                  : "First Name"
              }
              variant="standard"
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
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              InputLabelProps={{
                style: { fontSize: 16 },
              }}
              InputProps={{
                style: { fontSize: 18 },
              }}
              fullWidth
            />
            <TextField
              name="email"
              sx={{ mt: "6px" }}
              label={
                formik.touched.email && Boolean(formik.errors.email)
                  ? `${formik.errors.email}`
                  : "Email"
              }
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.email}
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
                formik.touched.password &&
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
                  : "Phone Number (Optional)"
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
            <Box pt={3}>
              <CreateAccButton
                type="submit"
                variant="contained"
                sx={{ width: "150px" }}
              >
                <Typography style={{ fontSize: "16px" }}>
                  Create Account
                </Typography>
              </CreateAccButton>
            </Box>
          </FormBox>
        </MainBox>
      </Modal>
    </Box>
  );
};
