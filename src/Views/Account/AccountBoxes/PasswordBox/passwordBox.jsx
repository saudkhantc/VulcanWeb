import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { FormBox, OldPassBox, Span, TextButton, TextLabel } from "../../styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { ShowErrorToast, ShowSuccessToast } from "../../../Common/Toast/toast";
import useAuthentication from "../../../../Infrastructure/States/onAuthStateChange";

export const PasswordBox = ({
  handleOpen,
  handleClose,
  showEditPass,
}) => {
  const {user} = useAuthentication()
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showReEnterPassword, setShowResetPassword] = useState(true);
  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      reEnterPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, "Must be 6 characters")
        .required("Old Password"),
      newPassword: Yup.string()
        .min(6, "Must be 6 characters")
        .required("New Password"),
      reEnterPassword: Yup.string()
        .min(6, "Must be 6 characters")
        .required("Re-Enter Password"),
    }),
    onSubmit: async (values) => {
      const { newPassword, reEnterPassword, oldPassword } = values;
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          oldPassword
        );
        // Check if new passwords match
        if (newPassword !== reEnterPassword) {
          ShowErrorToast("New passwords don't match");
          return;
        }
        await reauthenticateWithCredential(user, credential);
        // Update password
        await updatePassword(user, newPassword).then(() =>
          ShowSuccessToast("Password updated successfully")
        );
        handleClose();
        passwordFormik.resetForm();
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          ShowErrorToast("Incorrect old password. Please check and try again.");
        } else {
          ShowErrorToast(error.message);
        }
      }
    },
  });
  const oldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  const newPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const reEnterPasswordVisibility = () => {
    setShowResetPassword(!showReEnterPassword);
  };
  return (
    <Box pr={3} pl={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pt={4}
        pb={4}
      >
        <TextLabel>Password</TextLabel>
        {!showEditPass ? (
          <Span
            direction="row"
            alignItems={"center"}
            onClick={() => handleOpen({ prop: "password" })}
          >
            <TextButton curser="pointer">Edit</TextButton>
            <KeyboardArrowDownIcon fontSize="medium" color="primary" />
          </Span>
        ) : (
          <Span
            direction="row"
            alignItems={"center"}
            onClick={() => handleClose()}
          >
            <TextButton curser="pointer">Edit</TextButton>
            <KeyboardArrowUpIcon fontSize="medium" color="primary" />
          </Span>
        )}
      </Stack>
      {showEditPass && (
        <Box>
          <FormBox
            component="form"
            onSubmit={passwordFormik.handleSubmit}
            noValidate
          >
            <Grid container>
              <Grid lg={5} md={12} sm={12} xs={12}>
                <OldPassBox width="100%" margin="0 auto">
                  <TextField
                    name="oldPassword"
                    label={
                      passwordFormik.touched.oldPassword &&
                      Boolean(passwordFormik.errors.oldPassword)
                        ? passwordFormik.errors.oldPassword
                        : "Old Password"
                    }
                    variant="standard"
                    type={showOldPassword ? "password" : "text"}
                    onChange={passwordFormik.handleChange}
                    value={passwordFormik.values.oldPassword}
                    error={
                      passwordFormik.touched.oldPassword &&
                      Boolean(passwordFormik.errors.oldPassword)
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
                          <IconButton onClick={oldPasswordVisibility}>
                            {showOldPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </OldPassBox>
              </Grid>
              <Grid lg={7}></Grid>
              <Grid lg={5} md={12} sm={12} xs={12}>
                <Box width="100%" margin="0 auto">
                  <TextField
                    name="newPassword"
                    label={
                      passwordFormik.touched.newPassword &&
                      Boolean(passwordFormik.errors.newPassword)
                        ? passwordFormik.errors.newPassword
                        : "New Password"
                    }
                    variant="standard"
                    type={showNewPassword ? "password" : "text"}
                    onChange={passwordFormik.handleChange}
                    value={passwordFormik.values.newPassword}
                    error={
                      passwordFormik.touched.newPassword &&
                      Boolean(passwordFormik.errors.newPassword)
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
                          <IconButton onClick={newPasswordVisibility}>
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid lg={2}></Grid>
              <Grid lg={5} md={12} sm={12} xs={12}>
                <Box width="100%" margin="0 auto">
                  <TextField
                    name="reEnterPassword"
                    label={
                      passwordFormik.touched.reEnterPassword &&
                      Boolean(passwordFormik.errors.reEnterPassword)
                        ? passwordFormik.errors.reEnterPassword
                        : "Re-Enter Password"
                    }
                    variant="standard"
                    type={showReEnterPassword ? "password" : "text"}
                    onChange={passwordFormik.handleChange}
                    value={passwordFormik.values.reEnterPassword}
                    error={
                      passwordFormik.touched.reEnterPassword &&
                      Boolean(passwordFormik.errors.reEnterPassword)
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
                          <IconButton onClick={reEnterPasswordVisibility}>
                            {showReEnterPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container mt={3}>
              <Grid lg={2} md={2} sm={6} xs={6}>
                <Box
                  width="90%"
                  margin="0 auto"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
              <Grid lg={2} md={2} sm={6} xs={6}>
                <Box
                  width="90%"
                  margin="0 auto"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Button type="submit" variant="contained">
                    Update
                  </Button>
                </Box>
              </Grid>
              <Grid lg={6} md={6} sm={6} xs={6}></Grid>
            </Grid>
          </FormBox>
        </Box>
      )}
      <hr />
    </Box>
  );
};
