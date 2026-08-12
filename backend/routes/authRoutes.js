import express from "express";

import {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  resendOTP,
  changePassword,
  getMe,
  logout,
    deleteAccount
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/verify-email", verifyEmail);

router.post("/resend-otp", resendOTP);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.post("/change-password", authMiddleware, changePassword);

router.get("/me", authMiddleware, getMe);

router.post("/logout", logout);

router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;
