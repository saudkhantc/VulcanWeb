import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

export default function ProgressBar({ componentName }) {

  const steps = useSelector((state) => state.educatorSteps.steps);
  const courseSteps = useSelector((state) => state.courseSteps.courseSteps)
  const progressEduPercentage = (steps) * 25;
  const progressCoursesPercentage = (courseSteps) * 16.667;

  return (
    <>
      {
        componentName === "eduSteps" ?
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={progressEduPercentage} />
          </Box>
          :
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={progressCoursesPercentage} />
          </Box>
      }
    </>
  );
}
