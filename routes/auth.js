import express from "express";
import {
  register,
  login,
  logout,
  health,
  editUserInfo,
} from "../controllers/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/health", health);
router.put("/edit", editUserInfo);
export default router;
