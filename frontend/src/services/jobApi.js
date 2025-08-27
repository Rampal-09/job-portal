import axios from "axios";
const API_URL = "http://localhost:5000";

export const createJob = async (jobData) => {
  console.log("data sent to jobRouter");
  try {
    console.log("res go to from jobRouter");
    const res = await axios.post(`${API_URL}/jobs`, jobData);
    console.log("res come from jobController", res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
