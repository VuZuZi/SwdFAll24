import { createSlice } from "@reduxjs/toolkit";
import { addReview, getMovieById } from "../../api/movie";

const initialState = {
  movie: null,
  loading: false,
  error: null,
  success: false,
};

const singlemMovieSlice = createSlice({
  name: "singleMovie",
  initialState,
  reducers: {
    resetError: (state) => {
      state.loading = false;
      state.error = null;
    },
    resetLoading: (state) => {
      state.success = false;
    },
    getSignleMovieStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSingleMovieSuccess: (state, action) => {
      state.loading = false;
      state.movie = action.payload;
    },
    getSingleMovieError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createRateSuccess: (state, action) => {
      state.success = true;
    },
  },
});
export const {
  getSignleMovieStart,
  getSingleMovieError,
  getSingleMovieSuccess,
  createRateSuccess,
  resetError,
  resetLoading,
} = singlemMovieSlice.actions;
export default singlemMovieSlice.reducer;

export const fetchSingleMovie = (movieid) => async (dispatch) => {
  try {
    dispatch(getSignleMovieStart());
    const data = await getMovieById(movieid);
    dispatch(getSingleMovieSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getSingleMovieError(error.message));
  }
};
