import React, { useEffect } from "react";
import {
  Box,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ChoiceTypo, QuestionName } from "../../styles";
import { experienceSteps } from "../../../../Infrastructure/States/educatorStepsSlice";

function QuestionThree() {
  const options = [
    { id: 0, text: "0-1" },
    { id: 1, text: "1-5" },
    { id: 2, text: "5-10" },
    { id: 3, text: "10+" },
  ];
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);
  const questions = userData?.educator?.questions
  const years = useSelector((state) => state.educatorSteps.experienceStep.years);
  const question3 = "Approximately how many total years of teaching experience do you have?";
  const handleOptionChange = (e) => {
    let optionValue = e.target.value;
    dispatch(experienceSteps({ optionValue, question: "three" }));
  };
  useEffect(() => {
    if (userData && questions && questions?.years) {
      dispatch(experienceSteps({ optionValue: questions.years, question: "three" }));
    }
  }, [userData, questions, dispatch])
  return (
    <Box
      sx={{ height: "auto" }}
    >
      <Box sx={{ height: { lg: "100px", md: "100px" } }}>
        <QuestionName variant="h6">{question3}</QuestionName>
      </Box>
      <FormControl fullWidth>
        <RadioGroup onChange={handleOptionChange} value={years}>
          {options.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.text}
              control={<Radio size="medium" />}
              label={<ChoiceTypo>{option.text}</ChoiceTypo>}
              sx={{
                width: "100%",
                border: "1px solid #1c1d1f",
                p: 1,
                m: "3px",
                height: "76px",
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default QuestionThree;