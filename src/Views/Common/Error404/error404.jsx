import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorCode, ErrorContainer,ErrorMessage, HomeButton } from "./style";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <>
    <ErrorContainer>
      <ErrorCode variant="h1" color={'primary'}>404</ErrorCode>
      <ErrorMessage variant="body1">
        Oops! The page you're looking for does not exist.
      </ErrorMessage>
      <HomeButton variant="contained" onClick={() => navigate("/")}>
        Go to Home
      </HomeButton>
    </ErrorContainer>
    </>
  );
};

export default Error404;
