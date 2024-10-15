import express from "express";
import {
  addPackage,
  deletePackage,
  fetchAllPackage,
  updatePackage,
} from "../Controller/PremiumPackage.js";

const router = express.Router();

router.get("/", fetchAllPackage);
router.post("/", addPackage);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);
export default router;
