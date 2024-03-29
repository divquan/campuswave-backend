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
router.get("/:id", getPost);
router.post("/", addPost);
router.put("/", editPost);
router.delete("/:id", deletePost);

export default router;
