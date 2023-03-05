import express from "express";
import {
  getPosts,
  getPost,
  addPost,
  editPost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();
router.get("/", getPosts);
// router.get("/:id", getPost);
router.get("/:id", addPost);
router.get("/:id", editPost);
router.get("/:id", deletePost);

export default router;
