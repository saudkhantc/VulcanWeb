import React from "react";
import Steps from "./Steps/steps";
import { EduMainBox } from "./styles";
import AuthModals from "../Common/AuthModals/authModals";
import { useSelector } from "react-redux";

const EducatorAccountMainPage = () => {
  const chooseModal = useSelector((state) => state.auth.chooseModal);
  return (
    <>
      {<AuthModals chooseModal={chooseModal} />}
      <EduMainBox>
        <Steps />
      </EduMainBox>
    </>
  );
};
export default EducatorAccountMainPage;
