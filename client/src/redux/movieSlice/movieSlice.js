import { createSlice } from "@reduxjs/toolkit";
import { fetchMoviesApi } from "../../api/movie";

const initialState = {
  movies: null,
  loading: false,
  error: null,
  pages: 1,
  page: 1,
  totalMovies: null,
  casts: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMoviesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMoviesSuccess: (state, action) => {
      state.loading = false;
      state.movies = action.payload.movies;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.totalMovies = action.payload.totalMovies;
    },
    getMoviesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCast: (state, action) => {
      state.casts = action.payload;
    },
    addCasts: (state, action) => {
      state.casts = [...state.casts, action.payload];
    },
    removeCast: (state, action) => {
      state.casts = state.casts.filter((cast) => cast.id !== action.payload);
    },
    editCast: (state, action) => {
      state.casts = state.casts.map((cast) =>
        cast.id === action.payload.id ? action.payload : cast
      );
    },
    resetCast: (state) => {
      state.casts = [];
    },
  },
});

export const {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesError,
  fetchSingleMovieSucces,
  addCasts,
  editCast,
  removeCast,
  fetchCast,
  resetCast,
} = movieSlice.actions;

export default movieSlice.reducer;
// Async action creator to fetch movies
export const fetchMovies =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = 1,
  }) =>
  async (dispatch) => {
    try {
      dispatch(getMoviesStart());
      const data = await fetchMoviesApi(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
      );

      dispatch(getMoviesSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getMoviesError(error.message));
    }
  };
