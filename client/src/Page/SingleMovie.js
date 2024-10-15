import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import MovieInfo from "../components/SingleMovie/MovieInfo";
import MovieCasts from "../components/SingleMovie/MovieCasts";
import MovieRates from "../components/SingleMovie/MovieRate";
import Titles from "../components/Titles";
import { BiSolidCollection } from "react-icons/bi";
import Movie from "../components/Movie";
import ShareMovieModal from "../shared/modal/sharedModal";
import { useDispatch, useSelector } from "react-redux";
// import { getMovieByIdAction } from "../Redux/Actions/MoviesAction";
import Loader from "../shared/Notification/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { fetchSingleMovie } from "../redux/movieSlice/singleMovieSlice";
function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movie, loading, error, success } = useSelector(
    (state) => state.singleMovie
  );
  useEffect(() => {
    dispatch(fetchSingleMovie(id));
  }, [dispatch, id, success]);
  const sameClass = "w-full gap-6 flex-colo min-h-screen  ";
  //useSelector

  const { movies } = useSelector((state) => state.movie);
  const relatedMovies = movies?.filter((m) => m.category === movie?.category);

  //download movie video

  // const DownloadMovieVideo = async (videoUrl, name) => {
  //   await DownloadVideo(videoUrl, setProgress).then((data) => {
  //     setProgress(0);
  //     FileSaver.saveAs(data, name);
  //   });
  // };

  //useEffect

  return (
    <Layout>
      {loading || !movie ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : error ? (
        <div className={sameClass}>
          <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl felx-colo">
            <RiMovie2Line />
          </div>
          <p className="text-white text-sm">{error}</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MovieInfo
            movie={movie}
            setModalOpen={setModalOpen}
            // DownloadVideo={DownloadMovieVideo}
            // progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            <MovieRates movie={movie} />
            {/*Raltated */}
            {relatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Movies" Icon={BiSolidCollection} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6 ">
                  {movies?.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
