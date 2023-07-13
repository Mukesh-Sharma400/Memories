import express from "express";
import {
  createPost,
  updatePost,
  likePost,
  commentPost,
  getPost,
  getPosts,
  getPostsBySearch,
  deletePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", createPost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", commentPost);
router.get("/:id", getPost);
router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.delete("/:id", auth, deletePost);

export default router;
