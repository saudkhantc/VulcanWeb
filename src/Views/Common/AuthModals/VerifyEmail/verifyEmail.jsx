import React, { useEffect, useState } from "react";
import {
  VerifyEmailFormBox,
  VerifyEmailMainBox,
  customStyles,
} from "./verifyEmailStyles";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useAuthValue } from "../../../../Infrastructure/States/authContext";
import { closeChooseModal } from "../../../../Infrastructure/States/authModalsSlice";

export const VerifyEmail = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [time, setTime] = useState(60);
  const userEmailAddress = user?.email;
  const { currentUser, timeActive, setTimeActive } = useAuthValue();
  const isOpenModal = useSelector((state) => state.auth.isOpenModal);
  const selectedRoute = useSelector(
    (state) => state.auth.selectedRouteBeforeVerified
  );
    const handleCloseModal = () => {
    dispatch(closeChooseModal());
  };
  const handleVerifiedEmailAction = () => {
    handleCloseModal();
    navigate("/dashboard");
  };
  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            selectedRoute && navigate(selectedRoute);
            clearInterval(interval);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [currentUser, selectedRoute, navigate]);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive]);

  return (
    <Box>
      {/* Email Verification Modal */}
      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        sx={customStyles.modal}
        BackdropProps={{
          sx: customStyles.backdrop,
        }}
      >
        <VerifyEmailMainBox>
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
            Verify Account
          </Typography>
          <VerifyEmailFormBox component="form" noValidate>
            <Box
              p={2}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Box pt={2} pb={2}>
                {/* Display email verification status */}
                {currentUser?.emailVerified ? (
                  <Typography
                    variant="body2"
                    color="secondary"
                    sx={{
                      textDecoration: "none",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    Email verified successfully now you can proceed to the
                    dashboard.
                  </Typography>
                ) : (
                  <>
                    <Typography
                      variant="body2"
                      color="secondary"
                      sx={{
                        textDecoration: "none",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                    >
                      Verification Link sent to email <br />
                    </Typography>
                    <Typography
                      variant="body2"
                      color="secondary"
                      sx={{
                        textDecoration: "none",
                        fontSize: "16px",
                        textAlign: "center",
                        fontWeight: "900",
                        paddingTop: "4px",
                      }}
                    >
                      {userEmailAddress}
                    </Typography>
                  </>
                )}
              </Box>
              {currentUser?.emailVerified ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleVerifiedEmailAction}
                  >
                    Go to Dashboard
                  </Button>
                </>
              ) : (
                <Box
                  pt={2}
                  pb={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ width: "200px" }}
                >
                  <Button
                    variant="contained"
                    onClick={resendEmailVerification}
                    disabled={timeActive}
                  >
                    Resend Email {timeActive && time}
                  </Button>
                </Box>
              )}
              <Typography
                variant="body2"
                color={"secondary"}
                sx={{
                  textDecoration: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  textAlign: "center",
                  paddingTop: "20px",
                }}
              >
                {currentUser?.emailVerified
                  ? "Enhance your skills with Vulcan Learning Inistitute LLC"
                  : "Not Seeing the email? Ensure your email is correct and check the spam/junk folder."}
              </Typography>
            </Box>
          </VerifyEmailFormBox>
        </VerifyEmailMainBox>
      </Modal>
    </Box>
  );
};
