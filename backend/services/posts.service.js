import Post from "../models/Post.model.js";

const createPost = async (data) => {
  const post = new Post(data);
  return await post.save();
};

const getAllPostsService = async () => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("owner", "username _id");
  return posts;
};

const getPostByIdService = async (postId) => {
  const post = await Post.findById(postId).populate("owner", "username _id");
  return post;
};

const updatePostService = async (postId, postData) => {
  const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
    new: true,
  });
  return updatedPost;
};

const deletePostService = async (postId) => {
  await Post.findByIdAndDelete(postId);
};

export default {
  createPost,
  getAllPostsService,
  updatePostService,
  deletePostService,
  getPostByIdService,
};
