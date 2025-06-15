import authService from "../services/auth.service.js";

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.userId);
    const userPosts = await authService.getUserPosts(
      req.user.userId.toString()
    );
    res.status(200).json({ user, posts: userPosts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default { register, login, getProfile };
