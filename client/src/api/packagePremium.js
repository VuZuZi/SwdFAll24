import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getPackages = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/packages`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // If the server provides a specific error message, use it
      throw new Error(error.response.data.message);
    } else {
      // Otherwise, use a generic error message
      throw new Error("An error occurred during call api!");
    }
  }
};
export const deletePackages = async (packageId) => {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/packages/${packageId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // If the server provides a specific error message, use it
      throw new Error(error.response.data.message);
    } else {
      // Otherwise, use a generic error message
      throw new Error("An error occurred during call api!");
    }
  }
};
export const updatePackages = async (packagesData) => {
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/packages/${packagesData.packageId}`,
      packagesData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // Nếu server cung cấp một thông báo lỗi cụ thể, sử dụng nó
      throw new Error(error.response.data.message);
    }

    console.log(error);
  }
};

export const createPackages = async (packagesData) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/packages`,
      packagesData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // If the server provides a specific error message, use it
      throw new Error(error.response.data.message);
    } else {
      // Otherwise, use a generic error message
      throw new Error("An error occurred during call api!");
    }
  }
};

export const registerPremium = async (packageId) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/users/signup-premium`,
      { packageId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // If the server provides a specific error message, use it
      throw new Error(error.response.data.message);
    } else {
      // Otherwise, use a generic error message
      throw new Error("An error occurred during call api!");
    }
  }
};
