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
        errors: err.response.data.errors,
        message: err.response.data.message,
      };
    } else {
      throw {
        type: "genral",
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
    console.log("data from backend", res);
    return res.data;
  } catch (err) {
    console.log("axious error", err);
    if (err.response?.data) {
      throw {
        type: "validation",
        errors: err.response.data.errros,
        message: err.response?.data?.message,
      };
    } else {
      throw {
        type: "genral",
        errors: err.response.data.errors,
        message:
          err.response?.data?.message || err.message || "Something went wrong",
      };
    }
  }
};
