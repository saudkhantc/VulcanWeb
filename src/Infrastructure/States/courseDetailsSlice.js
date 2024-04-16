import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courseDetails: null,
    avatar: ''
};

const courseDetailsSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCourseDetails: (state, action) => {
            state.courseDetails = action.payload;
        },
        cleanCourseState: (state) =>{
            state.courseDetails = null
        },
        setAvatarValue: (state, action) =>{
            state.avatar = action.payload
        },
        cleanAvatarState: (state) =>{
            state.courseDetails = null
        }
    }
});

export const { setCourseDetails, cleanCourseState, setAvatarValue, cleanAvatarState } = courseDetailsSlice.actions;
export default courseDetailsSlice.reducer;
