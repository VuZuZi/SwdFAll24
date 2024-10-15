import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};
export const verifyToken = async (req, res, next) => {
  const token = req.cookies["auth_token"];
  try {
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
export const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an admin!");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
