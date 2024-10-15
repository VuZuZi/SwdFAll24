import React, { useEffect } from "react";
import SideBar from "../Index";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../shared/Toast";
import Loader from "../../../shared/Notification/Loader";
import { Empty } from "../../../shared/Notification/Empty";
import Pagination from "../../../components/Pagination";
import { fetchMovies } from "../../../redux/movieSlice/movieSlice";
import { useMutation } from "react-query";
import { deleteAllMovie, deleteMovie } from "../../../api/movie";
function MoviesList() {
  const dispatch = useDispatch();
  //all movies
  const { isLoading, movies, pages, page } = useSelector(
    (state) => state.movie
  );

  //delete Movie
  const { mutate, isSuccess } = useMutation(deleteMovie, {
    onSuccess: () => {
      Toast({ message: "Deleted success!", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });

  //Delete all Movie
  const {
    mutate: deleteAllMutate,
    isLoading: allLoading,
    isSuccess: deleteAllSuccess,
  } = useMutation(deleteAllMovie, {
    onSuccess: () => {
      Toast({ message: "Delete All Movies Success!", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  //delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure want to delete this movie") && mutate(id);
  };
  //   //delete all movies handler
  const deleteAllMoviesHandler = () => {
    window.confirm("Are you sure want to delete all movies") &&
      deleteAllMutate();
  };

  useEffect(() => {
    dispatch(fetchMovies({}));
  }, [isSuccess, deleteAllSuccess, dispatch]);
  const hanldePage = (page) => {
    dispatch(
      fetchMovies({
        pageNumber: page,
      })
    );
  };
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movies List</h2>
          {movies?.length > 0 && (
            <button
              disabled={allLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main font-medium transtions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded   "
            >
              {allLoading ? "Deleting...." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table
              data={movies}
              admin={true}
              onDeleteHandler={deleteMovieHandler}
            />

            {/* Loading More*/}
            <Pagination page={page} pages={pages} onPageChange={hanldePage} />
          </>
        ) : (
          <Empty message="You have no Movies" />
        )}
      </div>
    </SideBar>
  );
}

export default MoviesList;
