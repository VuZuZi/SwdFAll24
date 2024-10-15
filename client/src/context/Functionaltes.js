import { addFavoriteMovie } from "../redux/userSlice/favoriteSlice";
import Toast from "../shared/Toast";
import { useSelector } from "react-redux";
//check if movie is added to favorites
export const IfMovieLiked = (movie) => {
  const { likedMovies } = useSelector((state) => state.favorite);
  if (likedMovies) {
    return likedMovies.find((likedMovie) => likedMovie._id === movie?._id);
  }
};

//like movie functionalty
export const LikeMovie = (movie, dispatch, userInfo) => {
  !userInfo
    ? Toast({ message: "Please login to add to favorites", type: "ERROR" })
    : dispatch(addFavoriteMovie(movie._id));

  // Exit the function if user is not logged in
};
