import React from "react";
import { CreateAccountStep } from "./CreateAccountStep/createAccountStep";
import { ExperienceStep } from "./ExperienceStep/experienceStep";
import { ReachStep } from "./ReachStep/reachStep";
import { EducatorProfileStep } from "./EducatorProfileStep/educatorProfileStep";
import { useSelector } from "react-redux";

const Steps = () => {
  const steps = useSelector((state) => state.educatorSteps.steps)
  return (
    <>
      {steps === 1 && <CreateAccountStep />}
      {steps === 2 && <ExperienceStep />}
      {steps === 3 && <ReachStep />}
      {steps === 4 && <EducatorProfileStep />}
    </>
  );
};

export default Steps;
