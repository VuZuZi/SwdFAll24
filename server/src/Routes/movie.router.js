import express from "express";
import {
  createMovie,
  getMovieById,
  updateMovie,
  getMovies,
  deleteMovie,
  createMovieReview,
  deleteAllMovie,
} from "../Controller/movie.controller.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createMovie);
router.delete("/", verifyToken, isAdmin, deleteAllMovie);
router.put("/:id", verifyToken, isAdmin, updateMovie);
router.delete("/:id", verifyToken, isAdmin, deleteMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/:id/reviews", verifyToken, createMovieReview);

export default router;
