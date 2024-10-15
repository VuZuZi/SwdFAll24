import Movie from "../models/movie.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const createMovie = async (req, res, next) => {
  try {
    const {
      name,
      des,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      casts,
    } = req.body;
    const movie = new Movie({
      name,
      des,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      casts,
      userId: req.user._id,
    });

    if (movie) {
      const createdMovie = await movie.save();
      res.status(201).json(createdMovie);
    } else {
      res.status(400);
      throw new Error("Invalid movie data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteAllMovie = async (req, res, next) => {
  try {
    await Movie.deleteMany();
    res.status(201).json({ message: "Delete Successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await movie.deleteOne();
      res.status(201).json({ message: "Delete Successful" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateMovie = async (req, res, next) => {
  try {
    const {
      name,
      des,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      casts,
      video,
    } = req.body;
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (movie) {
      movie.name = name || movie.name;
      movie.des = des || movie.des;
      movie.image = image || movie.image;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.category = category || movie.category;
      movie.time = time || movie.time;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;
      const updatedMovie = await movie.save();

      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMovieById = async (req, res, next) => {
  const token = req.cookies["auth_token"];
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id).select("-password");
        const arrWatchHistories = user.watchHistory;
        //check moive exit in list watch histories
        // console.log(user.watchHistory[0]._id)
        // console.log(arrWatchHistories)
        // for(let item in arrWatchHistories){

        // }

        const watchHistory = { movieId: req.params.id };
        user.watchHistory.push(watchHistory);
        await user.save();
      }
      res.json(movie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getMovies = async (req, res, next) => {
  try {
    //filter movies by category,time,language,rate,year
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time: { $lte: time } }),
      ...(language && { language }),
      ...(rate && { rate: { $gte: rate } }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };
    //Load more movies function
    const page = Number(req.query.pageNumber) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    //get total number of movies
    const count = await Movie.countDocuments(query);
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit),
      totalMovies: count,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const createMovieReview = async (req, res, next) => {
  const movieId = req.params.id;
  const { rating, comment } = req.body;
  console.log(req.body);
  try {
    const movie = await Movie.findById(movieId);
    if (movie) {
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating,
        comment,
      };
      movie.reviews.push(review);
      movie.numberOfReviews = movie.reviews.length;
      const validRatings = movie.reviews.filter(
        (review) => !isNaN(review.rating)
      ); // Filter out NaN ratings
      const sumOfRatings = validRatings.reduce(
        (acc, review) => acc + review.rating,
        0
      );

      movie.rate = movie.rate = sumOfRatings / validRatings.length;
      await movie.save();
      res.status(201).json({
        message: "Review added",
      });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createMovie,
  getMovieById,
  updateMovie,
  getMovies,
  deleteMovie,
  createMovieReview,
  deleteAllMovie,
};
