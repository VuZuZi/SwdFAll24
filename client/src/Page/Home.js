import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Home/Banner";
import Population from "../components/Home/Population";
import Promos from "../components/Home/Promos";
import TopRated from "../components/Home/TopRated";
import { fetchMovies } from "../redux/movieSlice/movieSlice";
import Toast from "../shared/Toast";
function Home() {
  const { movies, error } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovies({}));
    if (error) {
      Toast(error, "ERROR");
    }
  }, [dispatch, error]);
  return (
    <Layout>
      <div className="-mt-10">
        <Banner movies={movies} />
        <Population movies={movies} isLoading={false} />
        <Promos />
        <TopRated movies={movies} isLoading={false} />
      </div>
    </Layout>
  );
}

export default Home;
