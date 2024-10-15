import { createSlice } from "@reduxjs/toolkit";
import { getPackages } from "../../api/packagePremium";

const initialState = {
  packages: null,
  loading: false,
  error: null,
  premiumChoose: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getPackagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPackagesSuccess: (state, action) => {
      state.loading = false;
      state.packages = action.payload;
      state.error = null;
    },
    getPackagesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectedPackageRegister: (state, action) => {
      state.premiumChoose = action.payload;
    },
  },
});

export const {
  getPackagesStart,
  getPackagesError,
  getPackagesSuccess,
  selectedPackageRegister,
} = categorySlice.actions;

export default categorySlice.reducer;
export const fetchPackages = () => async (dispatch) => {
  try {
    dispatch(getPackagesStart());
    const data = await getPackages();

    dispatch(getPackagesSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getPackagesError(error.message));
  }
};
