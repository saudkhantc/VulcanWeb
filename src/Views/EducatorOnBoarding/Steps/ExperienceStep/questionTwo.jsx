import React, { useEffect } from "react";
import { Box, FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { experienceSteps } from "../../../../Infrastructure/States/educatorStepsSlice";
import { ChoiceTypo, QuestionName } from "../../styles";

function QuestionTwo() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);
  const experienceStep = useSelector((state) => state.educatorSteps.experienceStep);
  const questions = userData?.educator?.questions
  const options = [
    { name: "professor", label: "Professor at a college / university" },
    { name: "teacher", label: "Teacher at K-12 School" },
    { name: "independent", label: "Independent Instructor" },
    { name: "tutor", label: "Tutor" },
    { name: "experienceOther", label: "Other" },
  ];
  useEffect(() => {
    if (userData && questions && questions?.experience) {
      Object.keys(questions.experience).forEach((key) => {
        const value = questions.experience[key];
        const firstTwoChars = key.substring(0, 2);
        const option = options.find((option) => option.name.substring(0, 2) === firstTwoChars);
        if (option) {
          dispatch(experienceSteps({ name: option.name, checked: value, question: "two" }));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, dispatch])
  return (
    <>
      <Box
        sx={{
          height: "auto"
        }}
      >
        <Box sx={{ height: { lg: "100px", md: "100px" } }}>
          <QuestionName variant="h6">
            What teaching roles have you occupied?
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
                    dispatch(
                      experienceSteps({ name, checked, question: "one" })
                    );
                  }}
                  sx={{ color: "#1c1d1f" }}
                  name={option.name}
                />
              }
              label={<ChoiceTypo variant="body1">{option.label}</ChoiceTypo>}
              sx={{ border: "1px solid #1c1d1f", p: 1, m: "3px" }}
            />
          ))}
        </FormGroup>
      </Box>
    </>
  );
}

export default QuestionTwo;