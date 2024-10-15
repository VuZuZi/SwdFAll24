import { createSlice } from "@reduxjs/toolkit";
import { addFavorite, deleteAllFavorite, getFavorite } from "../../api/movie";

const initialState = {
  likedMovies: null,
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    getFavoriteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getFavoriteSuccess: (state, action) => {
      state.loading = false;
      state.likedMovies = action.payload;
      state.error = null;
    },
    getFavoriteError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addFavoriteMovieSuccess: (state, action) => {
      state.loading = false;
      state.likedMovies.push(action.payload);
      state.error = null;
    },
  },
});
export const {
  getFavoriteError,
  getFavoriteStart,
  getFavoriteSuccess,
  addFavoriteMovieSuccess,
  resetError,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
export const fetchFavoriteMovie = (movieid) => async (dispatch) => {
  try {
    dispatch(getFavoriteStart());
    const data = await getFavorite(movieid);
    dispatch(getFavoriteSuccess(data));
  } catch (error) {
    dispatch(getFavoriteError(error.message));
  }
};
export const deleteAllFavoriteMovie = () => async (dispatch) => {
  try {
    dispatch(getFavoriteStart());
    await deleteAllFavorite();
    dispatch(getFavoriteSuccess(null));
  } catch (error) {
    dispatch(getFavoriteError(error.message));
  }
};
export const addFavoriteMovie = (movieId) => async (dispatch) => {
  try {
    console.log(movieId);
    dispatch(getFavoriteStart());
    const data = await addFavorite(movieId);
    dispatch(getFavoriteSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getFavoriteError(error.message));
  }
};
