import React, { useEffect } from "react";
import SideBar from "../Index";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
// import { getAllUsersAction } from "../../../Redux/Actions/userActions";
import Toast from "../../../shared/Toast";
import Loader from "../../../shared/Notification/Loader";
import { Empty } from "../../../shared/Notification/Empty";
// import { deleteMovieAction } from "../../../Redux/Actions/MoviesAction";
import { fetchAllUser } from "../../../redux/userSlice/user.slice";
import { useMutation } from "react-query";
import { deleteMovieById } from "../../../api/movie";
import { fetchMovies } from "../../../redux/movieSlice/movieSlice";
function DashBoard() {
  const dispatch = useDispatch();
  const {
    loading: catLoading,
    error: catError,
    categories,
  } = useSelector((state) => state.category);
  const {
    loading: userLoading,
    error: userError,
    users,
  } = useSelector((state) => state.user);
  const { loading, error, movies, totalMovies } = useSelector(
    (state) => state.movie
  );

  //delete
  const { mutate, isSuccess } = useMutation(deleteMovieById, {
    onSuccess: () => {
      Toast({ message: "Deleted success!", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  //delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure want to delete this movie") && mutate(id);
  };

  useEffect(() => {
    dispatch(fetchMovies({}));
  }, [isSuccess, dispatch]);
  //useEffect
  useEffect(() => {
    //get all users
    dispatch(fetchAllUser());
    //if error
    if (error || catError || userError) {
      Toast({ message: "Some thing went wrongs", type: "ERROR" });
    }
  }, [dispatch, error, catError, userError]);

  //dashboard data
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: loading ? "Loading..." : totalMovies || 0,
    },
    {
      bg: "bg-blue-600",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "Loading..." : categories?.length,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Loading..." : users?.length,
    },
  ];
  return (
    <SideBar>
      <h2 className="text-xl font-bold">DashBoard</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5 ">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3 ">
              <h2>{data.title}</h2>
              <p className="mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-border">Recent Movies</h3>
      {loading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <Table
          data={movies?.slice(0, 5)}
          admin={true}
          onDeleteHandler={deleteMovieHandler}
        />
      ) : (
        <Empty message="You have no Movies" />
      )}
    </SideBar>
  );
}

export default DashBoard;
