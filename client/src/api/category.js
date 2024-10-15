import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getCategoryApi = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/categories`, {
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

export const deleteCategory = async (categoryId) => {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/categories/${categoryId}`,
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
export const updateCategory = async (categoryData) => {
  try {
    console.log(categoryData);
    // Kiểm tra xem dataCategory có dữ liệu không

    const { data } = await axios.put(
      `${API_BASE_URL}/categories/${categoryData.categoryId}`,
      { title: categoryData.title },
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

export const createCategory = async (dataCategory) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/categories`,
      dataCategory,
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
