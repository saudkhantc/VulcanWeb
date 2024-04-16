import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ResetPassFormBox, ResetPassMainBox } from "./resetPassStyles";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  chooseModalLogin,
  closeChooseModal,
} from "../../../../Infrastructure/States/authModalsSlice";
import { useFormik } from "formik";
import {
  fetchSignInMethodsForEmail,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import * as Yup from "yup";
import { ShowSuccessToast } from "../../Toast/toast";
import { mainFont } from "../../../../Infrastructure/Theme/fontFamily";

export const ResetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const isOpenModal = useSelector((state) => state.auth.isOpenModal);
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleCloseModal = () => {
    dispatch(closeChooseModal());
    resetPassFormik.resetForm();
  };

  const handleLoginButtonClick = () => {
    dispatch(chooseModalLogin());
  };
  const validationSchemaForResetPass = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email")
      .test("email-exists", "Email does not exist", async function (value) {
        if (!value) return true; // Skip validation if the email field is empty

        // Check if the email exists in Firebase
        try {
          const signInMethods = await fetchSignInMethodsForEmail(auth, value);
          return signInMethods.length > 0;
        } catch (error) {
          return false;
        }
      }),
  });
  const resetPassFormik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: validationSchemaForResetPass,
    onSubmit: async (values) => {
      const { email } = values;
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          setEmailSent(true);
          ShowSuccessToast("Email Sent!");
        })
        .catch((error) => {});
    },
  });
  const customStyles = {
    backdrop: {
      backgroundColor: 'transparent', // Set the backdrop background color to transparent
    },
    modal:{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  };
  
  return (
    <Box>
      {/* Reset Password Modal */}

      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        sx={customStyles.modal}
        BackdropProps={{
          sx: customStyles.backdrop, // Apply custom styles to the backdrop
        }}
      >
        <ResetPassMainBox>
          <Box
            px={2}
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
            p={2}
            color="primary"
            sx={{ fontSize: "30px" }}
          >
            Reset Password
          </Typography>

          <ResetPassFormBox
            component="form"
            onSubmit={resetPassFormik.handleSubmit}
            noValidate
          >
            <TextField
              name="email"
              sx={{ mt: "6px" }}
              label={
                resetPassFormik.touched.email &&
                Boolean(resetPassFormik.errors.email)
                  ? `${resetPassFormik.errors.email}`
                  : "Email"
              }
              variant="standard"
              onChange={resetPassFormik.handleChange}
              value={resetPassFormik.values.email}
              error={
                resetPassFormik.touched.email &&
                Boolean(resetPassFormik.errors.email)
              }
              InputLabelProps={{
                style: { fontSize: 16 },
              }}
              InputProps={{
                style: { fontSize: 18 },
              }}
              fullWidth
            />
            <Box p={2}>
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  mt={4}
                  sx={{ width: "200px" }}
                >
                  {emailSent ? "Resend Email" : "Reset Password"}
                </Button>
              </Box>
              {emailSent ? (
                <Typography
                  variant="h1"
                  color="primary"
                  pt={4}
                  onClick={handleLoginButtonClick}
                  sx={{
                    textDecoration: "none",
                    fontSize: "30px",
                    cursor: "pointer",
                    textAlign: "center",
                    fontFamily: `${mainFont}`,
                  }}
                >
                  Login
                </Typography>
              ) : null}
            </Box>
          </ResetPassFormBox>
        </ResetPassMainBox>
      </Modal>
    </Box>
  );
};
