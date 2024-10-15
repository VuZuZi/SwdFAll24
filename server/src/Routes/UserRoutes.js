import {
  signUp,
  signIn,
  signOut,
  changePassword,
  signUpPremium,
  historyByUserId,
  updateUserProfile,
  deleteUserProfile,
  getLikedMovies,
  addLikedMovies,
  deleteLikedMovies,
  deleteAllLikedMovies,
  getAllUser,
} from "../Controller/UserController.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";

import express from "express";

const router = express.Router();
router.get("/", verifyToken, isAdmin, getAllUser);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", verifyToken, signOut);
router.put("/change-password", verifyToken, changePassword);
router.post("/signup-premium", verifyToken, signUpPremium);
router.delete("/deleteProfile/:userId", verifyToken, deleteUserProfile);
router.put("/update", verifyToken, updateUserProfile);
router.get("/favorites", verifyToken, getLikedMovies);
router.delete("/favorites", verifyToken, deleteAllLikedMovies);
router.post("/favorites/:movieId", verifyToken, addLikedMovies);
router.delete("/favorites/:movieId", verifyToken, deleteLikedMovies);
router.get("/histories", verifyToken, historyByUserId);

export default router;
