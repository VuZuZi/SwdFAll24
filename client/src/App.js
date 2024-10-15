import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import SignIn from "./Page/SignIn";
import SignUp from "./Page/SignUp";
import AboutUs from "./Page/AboutUs";
import Contact from "./Page/Contact";
import Movies from "./Page/Movies";
import { AdminProtectedRouter, ProtectedRouter } from "./ProtectRouter";
import PremiumAccount from "./Page/PremiumAccount";
import Profile from "./Page/DashBoard/Profile";
import AddMovie from "./Page/DashBoard/Admin/AddMovie";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./redux/movieSlice/movieSlice";
import { fetchCategories } from "./redux/categorySlice/category.slice";
import { fetchPackages } from "./redux/packageSlice/packageSlice";
import { useEffect } from "react";
import DashBoard from "./Page/DashBoard/Admin/Dashboard";
import ChangePassword from "./Page/DashBoard/ChangePassword";
import SingleMovie from "./Page/SingleMovie";
import FavoriteMovies from "./Page/DashBoard/FavoriteMovie";
import { fetchFavoriteMovie } from "./redux/userSlice/favoriteSlice";
import WatchPage from "./Page/WatchMovie";
import Users from "./Page/DashBoard/Admin/User";
import Categories from "./Page/DashBoard/Admin/Categories";
import MoviesList from "./Page/DashBoard/Admin/MovieList";
import EditMovie from "./Page/DashBoard/Admin/EditMovie";
import PackagePremium from "./Page/DashBoard/Admin/PremiumPackage";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchMovies({}));
    dispatch(fetchCategories());
    dispatch(fetchPackages());
    if (currentUser) {
      //get favorite list movies
      dispatch(fetchFavoriteMovie());
    }
  }, [currentUser, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:search" element={<Movies />} />
        <Route path="/movie/:id" element={<SingleMovie />} />

        <Route element={<ProtectedRouter />}>
          <Route path="/premium" element={<PremiumAccount />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<ChangePassword />} />
          <Route path="/favorites" element={<FavoriteMovies />} />
          <Route path="/watch/:id" element={<WatchPage />} />

          <Route element={<AdminProtectedRouter />}>
            <Route element={<AddMovie />} path="/add-movie" />
            <Route element={<Categories />} path="/categories" />
            <Route element={<PackagePremium />} path="/packages" />
            <Route element={<DashBoard />} path="/dashboard" />
            <Route element={<Users />} path="/users" />
            <Route element={<MoviesList />} path="/movieslist" />
            <Route element={<EditMovie />} path="/edit/:id" />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
