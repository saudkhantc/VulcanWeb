import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSteps: 1,
  basicStepState:{
    categoryValue: "",
    courseTitle: "",
    courseSubTitle:""
  }
};
export const coursesStepsSlice = createSlice({
  name: "courseSteps",
  initialState,
  reducers: {
    incrementCoursesSteps: (state) => {
      if (state.courseSteps <= 6) {
        state.courseSteps = state.courseSteps + 1;
      }
    },
    decrementCoursesSteps: (state) => {
      if (state.courseSteps <= 6) {
        state.courseSteps = state.courseSteps - 1;
      }
    },
    resetCoursesSteps: (state) => {
      if (state.courseSteps <= 6) {
        state.courseSteps = 1;
      }
    },
    basicStepControl: (state, action) => {
      const {question, categoryValue, courseTitle, courseSubTitle } = action.payload;      
      if (question === "category") {
        state.basicStepState.categoryValue = categoryValue;
      } else if (question === "courseTitle") {
        state.basicStepState.courseTitle = courseTitle;
        state.basicStepState.courseSubTitle = courseSubTitle;
      }
      return state;
    },
    resetBasicStepValues: (state) => {
      state.basicStepState.courseTitle = "";
      state.basicStepState.courseSubTitle = "";
      state.basicStepState.categoryValue = "";
    },
  },
});
export const {
  incrementCoursesSteps,
  decrementCoursesSteps,
  resetCoursesSteps,
  basicStepControl,
  resetBasicStepValues
} = coursesStepsSlice.actions;
export default coursesStepsSlice.reducer;
