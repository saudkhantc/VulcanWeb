import React from "react";
import { Box } from "@mui/material";
import "./authModals.css";
import { useSelector } from "react-redux";
import { VerifyEmail } from "./VerifyEmail/verifyEmail";
import { ResetPassword } from "./ResetPassword/resetPassword";
import { CreateAccount } from "./CreateAccount/createAccount";
import { LoginAccount } from "./LoginAccount/loginAccount";
import { ModalBackgroundBox } from "./authModalsStyles";
import { ModalTypes } from "../../../Infrastructure/States/authModalsSlice";

function AuthModals({ chooseModal }) {
  const isOpenModal = useSelector((state) => state.auth.isOpenModal);
  return (
    <>
      <Box>
        {isOpenModal && <ModalBackgroundBox />}
        {chooseModal === ModalTypes.SIGNUP && isOpenModal ? (
          <>
            {/* Sign Up Modal */}
            <CreateAccount />
          </>
        ) : chooseModal === ModalTypes.LOGIN && isOpenModal ? (
          <>
            {/* Log in Modal */}
            <LoginAccount />
          </>
        ) : chooseModal === ModalTypes.RESET_PASSWORD && isOpenModal ? (
          <>
            {/* Reset Password Modal */}
            <ResetPassword />
          </>
        ) : chooseModal === ModalTypes.EMAIL_VERIFICATION && isOpenModal ? (
          <>
            {/* Verify Email Modal */}
            <VerifyEmail />
          </>
        ) : null}
      </Box>
    </>
  );
}
export default AuthModals;
