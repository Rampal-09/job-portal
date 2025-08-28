import axios from "axios";
const API_URL = "http://localhost:5000";

export const createJob = async (jobData) => {
  try {
    console.log("res go to from jobRouter");
    const res = await axios.post(`${API_URL}/jobs`, jobData);

    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      throw {
        type: "auth",
        message: "please login first",
      };
    } else if (err.response?.status === 400) {
      throw {
        type: "client",
        message: err.response?.data?.message,
      };
    } else {
      throw {
        message: err.response?.data.message,
      };
    }
  }
};

export const getJobs = async () => {
  try {
    const res = await axios.get(`${API_URL}/jobs`);
    console.log("response", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
