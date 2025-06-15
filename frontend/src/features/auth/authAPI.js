import axios from "../../services/axios";

// Register new user
export const registerUser = async (userData) => {
  try {
    const res = await axios.post("/auth/register", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Registration failed" };
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post("/auth/login", credentials);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Login failed" };
  }
};

// Get user profile (requires token)
export const getProfile = async () => {
  try {
    const res = await axios.get("/auth/profile");
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Failed to fetch profile" };
  }
};
