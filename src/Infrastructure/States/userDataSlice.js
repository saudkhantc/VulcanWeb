import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, onValue, off } from "firebase/database";


export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async (uid, { dispatch }) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${uid}/`);
    return new Promise((resolve, reject) => {
      const unsubscribe = onValue(
        userRef,
        (snapshot) => {
          const userData = snapshot.val();
          dispatch(setUserData(userData));
          resolve(userData);
        },
        (error) => {
          reject(error);
        }
      );
      return () => off(userRef, "value", unsubscribe);
    });
  }
);
const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    data: null,
    error: null,
    loading: false,
    coursesData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    setCoursesData: (state, action) => {
      state.coursesData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { setUserData, setCoursesData } = userDataSlice.actions;
export default userDataSlice.reducer;
