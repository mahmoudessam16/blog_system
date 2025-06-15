import Post from "../models/Post.model.js";
import mongoose from "mongoose";

const checkPostOwner = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.userId;

  if (!userId) {
    console.error(
      "User ID is undefined. Check authMiddleware and token payload."
    );
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.owner.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (err) {
    console.error("Error in checkPostOwner:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default checkPostOwner;
