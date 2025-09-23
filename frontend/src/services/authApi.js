import axios from "axios";

const API_URL = "http://localhost:5000";

export const signup = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signUp`, userData);
    return res.data;
  } catch (err) {
    if (err.response?.data) {
      throw {
        type: "validation",
        errors: err.response.data.errors || [],
        message: err.response.data.message,
      };
    } else {
      throw {
        type: "general",
        message:
          err.response?.data?.message || err.message || "Something went wrong",
      };
    }
  }
};

export const login = async (loginData) => {
  try {
    console.log("loginData", loginData);
    const res = await axios.post(`${API_URL}/auth/login`, loginData);

    return res.data;
  } catch (err) {
    console.log("err");
    console.log("err response ", err.response);
    if (err.response?.status === 400) {
      throw {
        type: "validation",
        errors: err.response.data.errors,
        message: err.response.data.message,
      };
    } else if (err.response?.status === 401) {
      throw {
        type: "auth",

        message: err.response?.data?.message,
      };
    } else {
      throw {
        type: "general",
        message:
          err.response?.data?.message || err.message || "Something went wrong",
      };
    }
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(`${API_URL}/auth/logout`);
    return res.data;
  } catch (err) {
    throw {
      type: "general",
      message: err.response?.data?.message || "Logout failed",
    };
  }
};
