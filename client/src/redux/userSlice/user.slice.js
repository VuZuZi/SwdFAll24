import { createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "../../api/auth";

const initialState = {
  currentUser: null,
  likedMovies: null,
  users: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.error = null;
    },
    startCall: (state) => {
      state.loading = false;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    fetchFavoriteSuccess: (state, action) => {
      state.likedMovies = action.payload;
    },
    fetchUserSuccess: (state, action) => {
      state.users = action.payload;
    },
    userError: (state, error) => {
      state.loading = false;
      state.error = error;
    },
  },
});
export const {
  signInSuccess,
  updateUserSuccess,
  addFavorites,
  fetchFavoriteSuccess,
  startCall,
  userError,
  fetchUserSuccess,
  resetUser,
} = userSlice.actions;
export default userSlice.reducer;
export const fetchAllUser = () => async (dispatch) => {
  try {
    dispatch(startCall());
    const data = await getAllUser();
    dispatch(fetchUserSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(userError(error.message));
  }
};
