// categorySlice.js

import { createSlice } from "@reduxjs/toolkit";
import { getCategoryApi } from "../../api/category";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCategorySuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload; // Assuming payload is an array of categories
    },
    getCategoryError: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Assuming payload is the error message
    },
  },
});

export const { getCategoryStart, getCategorySuccess, getCategoryError } =
  categorySlice.actions;

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(getCategoryStart());
    const data = await getCategoryApi();

    dispatch(getCategorySuccess(data));
  } catch (error) {
    dispatch(getCategoryError(error.message));
  }
};

export default categorySlice.reducer;
