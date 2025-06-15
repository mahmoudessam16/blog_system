import express from "express";
import postsController from "../controllers/posts.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkPostOwner from "../middlewares/checkPostOwener.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  postsController.createPostController
);
router.put(
  "/:id",
  authMiddleware,
  checkPostOwner,
  upload.single("image"),
  postsController.updatePost
);
router.delete(
  "/:id",
  authMiddleware,
  checkPostOwner,
  postsController.deletePost
);

export default router;
