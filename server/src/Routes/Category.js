import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../Controller/Category.js";
const route = express.Router();

route.get("/", getCategories);
route.post("/", addCategory);
route.put("/:id", updateCategory);
route.delete("/:id", deleteCategory);
export default route;
