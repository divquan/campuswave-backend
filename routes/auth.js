import express from "express";
import {
  register,
  login,
  logout,
  health,
  editUserInfo,
  login3,
  login2,
} from "../controllers/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/login2", login2);
router.post("/login3", login3);
router.post("/logout", logout);
router.get("/health", health);
router.put("/edit", editUserInfo);
export default router;
