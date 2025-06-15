import postService from "../services/posts.service.js";
import cloudinary from "../config/cloudinary.js";

const createPostController = async (req, res) => {
  try {
    const { title, content, imageUrl: imageUrlFromBody } = req.body;
    const owner = req.user.userId;
    let imageUrl = "";

    // If user uploaded image as a file (local)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploads",
      });
      console.log(result);
      imageUrl = result.secure_url;
      // If user provided image URL in the request body (Image Url)
    } else if (imageUrlFromBody) {
      imageUrl = imageUrlFromBody;
    }

    const newPost = await postService.createPost({
      title,
      content,
      imageUrl,
      owner,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPostsService();
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostByIdService(req.params.id);
    console.log(post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const postData = {
      title: req.body.title,
      content: req.body.content,
    };

    console.log(postData);

    if (req.file) {
      postData.imageUrl = req.file.path;
    }

    const updatedPost = await postService.updatePostService(
      req.params.id,
      postData
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    await postService.deletePostService(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  createPostController,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
