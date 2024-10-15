import User from "../models/user.js";
import { generateToken } from "../middleware/auth.js";
import bcrypt from "bcryptjs";
import Movie from "../models/movie.model.js";
import PremiumPackage from "../models/PremiumPackage.js";
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const signUp = async (req, res) => {
  try {
    const { email, name, password, phone, address, dob } = req.body;

    // check if user exists
    const isExists = await User.findOne({ email });
    if (isExists) {
      res.status(400);
      throw new Error("User is exist");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      fullName: name,
      password: hashedPassword,
      phone,
      address,
      dob,
    });

    await user.save();
    const token = generateToken(user._id);
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.header("auth_token", token);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user._id);

  res.cookie("auth_token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.header("auth_token", token);
  res.status(200).json(user);
};

export const signOut = async (req, res) => {
  const token = req.header("auth_token");
  console.log(token);
  // destroy token
  // destroyToken(token);

  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logged out successfully" });
};
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Finding the user by ID
    const user = await User.findById(req.user._id);

    // Checking if the old password matches the stored hashed password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Hashing the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Updating the user's password
    user.password = hashedPassword;
    await user.save();

    // Sending the response with success message
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const signUpPremium = async (req, res) => {
  const user = await User.findById(req.user._id);
  const packageId = req.body.packageId;
  console.log(packageId);
  // search package premium by id
  const isExists = await PremiumPackage.findById(packageId);
  if (!isExists) {
    return res.status(404).json({ message: "Package premium not found" });
  }
  user.premium.exp = new Date(
    new Date().getTime() + isExists.day * 24 * 60 * 60 * 1000
  );
  user.premium.isPremium = true;
  await user.save();
  res.status(200).json({ message: "Upgrade to premium successfully" });
};

export const historyByUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate("watchHistory.movieId");
    if (user) {
      res.json(user.watchHistory);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateUserProfile = async (req, res, next) => {
  const { name, email, image, phone, bod } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.fullName = name || user.fullName;
      user.email = email || user.email;
      user.avatar = image || user.avatar;
      user.phone = phone || user.phone;
      user.bod = bod || user.bod;

      const updateUser = await user.save();
      res.json(updateUser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = User.findById(userId);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Cant delete admin account");
      }
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getLikedMovies = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("likedMovies");
    if (user) {
      res.json(user.likedMovies);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteAllLikedMovies = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("likedMovies");
    if (user) {
      user.likedMovies = [];
      await user.save();
      res.status(200).json({ message: "Delete Success!" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const addLikedMovies = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const moive = await Movie.findById(movieId);
    if (!moive) {
      res.status(404);
      throw new Error("Movie not found");
    }
    const user = await User.findById(req.user._id);
    if (user) {
      if (user?.likedMovies) {
        const isMovieLiked = user.likedMovies.some(
          (movie) => movie._id.toString() === movieId
        );

        if (isMovieLiked) {
          res.status(400);
          throw new Error("Movie already liked");
        }
      }
      user.likedMovies.push(movieId);
      await user.save();
      const userUpdated = await User.findById(req.user._id).populate(
        "likedMovies"
      );
      res.status(200).json(userUpdated.likedMovies);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteLikedMovies = async (req, res, next) => {
  const { movieId } = req.params();
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.likedMovies.pull({ _id: movieId });
      await user.save();
      res.status(200).json({ message: "Remove sucessfully movie " });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
