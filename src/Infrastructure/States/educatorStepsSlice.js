import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  steps: 1,
  experienceStep: {
    professor: false,
    teacher: false,
    independent: false,
    tutor: false,
    experienceOther: false,
    inPerson: false,
    liveOnline: false,
    recordedOnline: false,
    mediumOther: false,
    years: "",
  },
};
export const educatorStepsSlice = createSlice({
  name: "educatorSteps",
  initialState,
  reducers: {
    incrementSteps: (state) => {
      if (state.steps <= 4) {
        state.steps = state.steps + 1;
      }
    },
    decrementSteps: (state) => {
      if (state.steps <= 4) {
        state.steps = state.steps - 1;
      }
    },
    resetSteps: (state) => {
      if (state.steps <= 4) {
        state.steps = 1;
      }
    },
    experienceSteps: (state, action) => {
      const { name, checked, question } = action.payload;
      if (question === "one") {
        state.experienceStep[name] = checked;
      }
      if (question === "two") {
        state.experienceStep[name] = checked;
      }
      if (question === "three") {
        const { optionValue } = action.payload;
        state.experienceStep.years = optionValue;
      }
      return state;
    },
    resetExperienceStepValues: (state) => {
      state.experienceStep.professor = false;
      state.experienceStep.teacher = false;
      state.experienceStep.independent = false;
      state.experienceStep.tutor = false;
      state.experienceStep.experienceOther = false;
      state.experienceStep.inPerson = false;
      state.experienceStep.liveOnline = false;
      state.experienceStep.recordedOnline = false;
      state.experienceStep.mediumOther = false;
      state.experienceStep.years = "";
    },
  },
});
export const {
  resetSteps,
  incrementSteps,
  decrementSteps,
  experienceSteps,
  resetExperienceStepValues
} = educatorStepsSlice.actions;
export default educatorStepsSlice.reducer;
