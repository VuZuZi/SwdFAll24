import React, { useEffect } from "react";
import SideBar from "./Index";
import Table from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../shared/Toast";
import Loader from "../../shared/Notification/Loader";
import { Empty } from "../../shared/Notification/Empty";
import { fetchFavoriteMovie } from "../../redux/userSlice/favoriteSlice";
import { deleteAllFavoriteMovie } from "../../redux/userSlice/favoriteSlice";

function FavoriteMovies() {
  const dispatch = useDispatch();
  const { loading, error, likedMovies } = useSelector(
    (state) => state.favorite
  );
  //Delete

  //delete movies handler
  const deleteMoviesHandler = () => {
    window.confirm("Are you sure want to delete all movies") &&
      dispatch(deleteAllFavoriteMovie());
  };
  // useEffect
  useEffect(() => {
    if (error) {
      Toast({ message: error, type: "ERROR" });
    }
  }, [dispatch, error, likedMovies]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={loading}
              onClick={deleteMoviesHandler}
              className="bg-main font-medium transtions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded   "
            >
              {loading ? "Deleting...." : "Delete All"}
            </button>
          )}
        </div>
        {loading ? (
          <Loader />
        ) : likedMovies?.length > 0 ? (
          <Table data={likedMovies} admin={false} />
        ) : (
          <Empty message="You have no favorite Movies" />
        )}
      </div>
    </SideBar>
  );
}

export default FavoriteMovies;
