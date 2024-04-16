import React, { useState } from "react";
import { Loader } from "../Common/loader";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { HeadingBox, MainBox } from "./styles";
import { NameBox } from "./AccountBoxes/NameBox/nameBox";
import { EmailBox } from "./AccountBoxes/EmailBox/emailBox";
import { NumberBox } from "./AccountBoxes/NumberBox/numberBox";
import { PasswordBox } from "./AccountBoxes/PasswordBox/passwordBox";

export const Account = () => {
  const [showEditName, setShowEditName] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [showEditNumber, setShowEditNumber] = useState(false);
  const userData = useSelector((state) => state.userData.data);
  const loading = useSelector((state) => state.userData.loading);
  const handleOpen = ({ prop }) => {
    if (prop === "name") {
      setShowEditName(true);
      setShowEditPass(false);
      setShowEditNumber(false);
    } else if (prop === "password") {
      setShowEditPass(true);
      setShowEditName(false);
      setShowEditNumber(false);
    } else if (prop === "number") {
      setShowEditNumber(true);
      setShowEditPass(false);
      setShowEditName(false);
    }
  };
  const handleClose = () => {
    setShowEditName(false);
    setShowEditPass(false);
    setShowEditNumber(false);
  };
  return (
    <MainBox>
      <HeadingBox p={5}>
        <Typography variant="h1" color={"primary"}>
          Account
        </Typography>
      </HeadingBox>
      {loading ? (
        <Loader />
      ) : (
        <>
          <EmailBox userData={userData} />
          <NameBox
            handleOpen={handleOpen}
            handleClose={handleClose}
            showEditName={showEditName}
          />
          <NumberBox
            handleOpen={handleOpen}
            handleClose={handleClose}
            showEditNumber={showEditNumber}
          />
          <PasswordBox
            handleOpen={handleOpen}
            handleClose={handleClose}
            showEditPass={showEditPass}
            userData={userData}
          />
        </>
      )}
    </MainBox>
  );
};
