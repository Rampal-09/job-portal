import axios from "axios";
const API_URL = "http://localhost:5000";

export const createJob = async (jobData) => {
  try {
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

    return res.data;
  } catch (err) {}
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/me`);
    return res.data;
  } catch (err) {
    return null;
  }
};

export const updateJob = async (editId, updateData) => {
  try {
    const res = await axios.put(`${API_URL}/jobs/${editId}`, updateData);

    return res.data;
  } catch (err) {}
};

export const DeleteJob = async (deleteId) => {
  try {
    const res = await axios.delete(`${API_URL}/jobs/${deleteId}`);
    console.log("jobData", res.data);
    return res.data;
  } catch (err) {}
};

export const applyJob = async (Id) => {
  try {
    const res = await axios.post(`${API_URL}/jobs/apply/${Id}`);
    return res.data;
  } catch (err) {
    throw {
      message: err.response?.data?.message,
    };
  }
};

export const addToFavoite = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/jobs/favorite/${id}`);

    return res.data;
  } catch (err) {
    throw {
      message: err.response?.data?.message,
    };
  }
};

export const getAppliedJob = async () => {
  try {
    const res = await axios.get(`${API_URL}/jobs/apply`);

    return res.data;
  } catch (err) {
    throw {
      message: err.response.data.message,
    };
  }
};

export const getFavoriteJobs = async () => {
  try {
    const res = await axios.get(`${API_URL}/jobs/favorite`);

    return res.data.favoriteJobs;
  } catch (err) {
    throw {
      message: err.response.data.message,
    };
  }
};

export const removeFavoriteJob = async (id) => {
  const res = await axios.delete(`${API_URL}/jobs/favorite/${id}`);
  console.log("res", res);
  return res.data;
};
