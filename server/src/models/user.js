import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // thêm validation check có ký tự hoa
    minlength: 6,
  },
  bod: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    required: true, // thiếu validate
  },
  premium: {
    isPremium: {
      type: Boolean,
      default: false,
    },
    exp: {
      type: Date,
      default: undefined,
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "/images/user.png",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  likedMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
    },
  ],
  watchHistory: [
    {
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
      },
      watchedOn: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
