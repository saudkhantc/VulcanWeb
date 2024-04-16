import React, { useEffect } from "react";
import { Box, FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { experienceSteps } from "../../../../Infrastructure/States/educatorStepsSlice";
import { ChoiceTypo, QuestionName } from "../../styles";

function QuestionOne() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);
  const questions = userData?.educator?.questions
  const experienceStep = useSelector((state) => state.educatorSteps.experienceStep);
  const options = [
    { name: "inPerson", label: "In Person" },
    { name: "liveOnline", label: "Live Online" },
    { name: "recordedOnline", label: "Pre-recorded Online" },
    { name: "mediumOther", label: "Other" },
  ];
  useEffect(() => {
    if (userData && questions && questions?.mediums) {
      Object.keys(questions.mediums).forEach((key) => {
        const value = questions.mediums[key];
        const firstTwoChars = key.substring(0, 2);
        const option = options.find((option) => option.name.substring(0, 2) === firstTwoChars);
        if (option) {
          dispatch(experienceSteps({ name: option.name, checked: value, question: "one" }));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, questions, dispatch]);

  return (
    <Box
      sx={{ height: "auto" }}
    >
      <Box sx={{
        height: { lg: "100px", md: "100px" }
      }}>
        <QuestionName variant="h6">
          Which formats have you taught in?
        </QuestionName>
      </Box>
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={experienceStep[option.name]}
                onChange={(e) => {
                  const { name, checked } = e.target;
                  dispatch(experienceSteps({ name, checked, question: "one" }));
                }}
                name={option.name}
                sx={{ color: "#1c1d1f" }}
              />
            }
            label={<ChoiceTypo variant="body1">{option.label}</ChoiceTypo>}
            sx={{ border: "1px solid #1c1d1f", p: 1, m: "3px" }}
          />
        ))}
      </FormGroup>
    </Box>
  );
}

export default QuestionOne;