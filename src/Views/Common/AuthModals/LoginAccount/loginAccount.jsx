import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  LoginFormBox,
  LoginMainBox,
  LoginSigUpTextLink,
  styles,
} from "./loginAccountStyles";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import {
  chooseModalResetPass,
  chooseModalSignUp,
  closeChooseModal,
} from "../../../../Infrastructure/States/authModalsSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ShowErrorToast, ShowSuccessToast } from "../../Toast/toast";
import { getDatabase, ref, update } from "firebase/database";

export const LoginAccount = () => {
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.auth.isOpenModal);
  const [showPassword, setShowPassword] = useState(true);

  const handleCloseModal = () => {
    dispatch(closeChooseModal());
    loginFormik.resetForm();
  };
  const handleSignUpButtonClick = () => {
    dispatch(chooseModalSignUp());
    loginFormik.resetForm();
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleResetPassButtonClick = () => {
    dispatch(chooseModalResetPass());
  };
  const handleAuthenticationError = (error) => {
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
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email"),
      password: Yup.string()
        .min(6, "Must be 6 characters")
        .required("Password"),
    }),
    onSubmit: async (values) => {
      try {
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
        handleCloseModal();
      } catch (error) {
        handleAuthenticationError(error);
      }
    },
  });
  return (
    <Box>
      {/* Log in Modal */}
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
        <LoginMainBox>
          <Box
            pb={1}
            pt={1}
            onClick={handleCloseModal}
            sx={{
              position: "relative",
              top: "9px",
              right: "-142px",
            }}
          >
            <CloseIcon />
          </Box>
          <Typography
            variant="h1"
            px={4}
            pb={4}
            color="primary"
            sx={{ fontSize: "36px" }}
          >
            Log In
          </Typography>
          <Box>
            <LoginSigUpTextLink
              onClick={handleSignUpButtonClick}
              variant="h6"
              sx={{ fontSize: "16px" }}
            >
              New? Create An Account.
            </LoginSigUpTextLink>
          </Box>
          <LoginFormBox
            component="form"
            onSubmit={loginFormik.handleSubmit}
            noValidate
          >
            <TextField
              name="email"
              label={
                loginFormik.touched.email && Boolean(loginFormik.errors.email)
                  ? loginFormik.errors.email
                  : "Email"
              }
              variant="standard"
              type="email"
              autoComplete="username"
              onChange={loginFormik.handleChange}
              value={loginFormik.values.email}
              error={
                loginFormik.touched.email && Boolean(loginFormik.errors.email)
              }
              sx={{ pb: "14px", pt: "5" }}
              InputLabelProps={{
                style: {
                  fontSize: 16,
                },
              }}
              InputProps={{
                style: { fontSize: 18 },
              }}
              fullWidth
            />

            <TextField
              name="password"
              label={
                loginFormik.touched.password &&
                Boolean(loginFormik.errors.password)
                  ? loginFormik.errors.password
                  : "Password"
              }
              variant="standard"
              type={showPassword ? "password" : "text"}
              onChange={loginFormik.handleChange}
              value={loginFormik.values.password}
              autoComplete="current-password"
              error={
                loginFormik.touched.password &&
                Boolean(loginFormik.errors.password)
              }
              sx={{ pb: "14px", pt: "5" }}
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
            <Box pb={2}>
              <Link
                href="#"
                variant="body2"
                sx={{ textDecoration: "none", fontSize: "16px" }}
              ></Link>
              <Typography
                variant="body2"
                color={"primary"}
                onClick={handleResetPassButtonClick}
                sx={{
                  textDecoration: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Forgot password?
              </Typography>
            </Box>
            <Box>
              <Button type="submit" variant="contained" sx={{ width: "150px" }}>
                Log In
              </Button>
            </Box>
          </LoginFormBox>
        </LoginMainBox>
      </Modal>
    </Box>
  );
};
