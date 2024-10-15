import React, { useEffect } from "react";
import Titles from "../Titles";
import { BiSolidBookmark } from "react-icons/bi";
import { Input, Select } from "../../shared/input";
import Rating from "../Start";
import { Empty } from "../../shared/Notification/Empty";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReviewValidation } from "../../shared/validation/movieValidation";
import Toast from "../../shared/Toast";
import { InlineError } from "../../shared/Notification/Error";
import { Link } from "react-router-dom";
import {
  createReview,
  fetchSingleMovie,
  resetError,
  resetLoading,
} from "../../redux/movieSlice/singleMovieSlice";
import { useMutation } from "react-query";
import { addReview } from "../../api/movie";
const Ratings = [
  {
    title: "0-Poor",
    value: 0,
  },
  {
    title: "1-Fair",
    value: 1,
  },
  {
    title: "2-Good",
    value: 2,
  },
  {
    title: "3-VeryGood",
    value: 3,
  },
  {
    title: "4-Excellent",
    value: 4,
  },
  {
    title: "5-Masterpiece",
    value: 5,
  },
];
function MovieRates({ movie }) {
  const dispatch = useDispatch();
  //useSelector

  const { currentUser } = useSelector((state) => state.user);

  //validate review
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReviewValidation),
  });

  const { mutate, isLoading } = useMutation(addReview, {
    onSuccess: () => {
      Toast({ message: "Thanks for rating!", type: "SUCCESS" });
      dispatch(fetchSingleMovie(movie._id));
    },
    onError: (error) => {
      Toast({ message: "Thanks for rating!", type: "ERROR" });
    },
  });
  //on submit
  const onSubmit = (data) => {
    mutate({ movieId: movie._id, ...data });
  };

  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BiSolidBookmark} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded  ">
        {/*Write review */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold ">
            Review "{movie.name}"
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Write a review for this movie. IT will be posted on this page.
            MonterHub. Nơi giải trí hàng đầu!!!
          </p>
          <div className="text-sm w-full">
            <Select
              label="select Rating"
              options={Ratings}
              name="rating"
              register={{ ...register("rating") }}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={watch("rating", false)} />
            </div>
            {errors.rating && <InlineError text={errors.rating.message} />}
          </div>
          {/*Message */}

          <div className="w-full">
            <Input
              name="comment"
              register={{ ...register("comment") }}
              label="Message"
              placeholder="Make it short and sweet..."
            />
          </div>
          {errors.comment && <InlineError text={errors.comment.message} />}

          {/*Submit */}
          {currentUser ? (
            <button
              disabled={isLoading}
              type="submit"
              className="bg-subMain text-white py-2 w-full flex-colo rounded "
            >
              {isLoading ? "Loading ...." : "Submit"}
            </button>
          ) : (
            <Link
              to={"/login"}
              className="bg-subMain text-white py-2 w-full flex-colo rounded "
            >
              Login to review
            </Link>
          )}
        </form>
        {/*Reviwes */}
        <div className="col-span-3 flex w-full flex-col gap-6">
          <h3 className="text-xl text-text font-semibold ">
            Reviews ({movie?.reviews?.length})
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll ">
            {movie?.reviews?.length > 0 ? (
              movie?.reviews?.map((review) => (
                <div
                  key={review?._id}
                  className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg "
                >
                  <div className="col-span-2 bg-main hidden md:block">
                    <img
                      src={
                        review?.userImage
                          ? review?.userImage
                          : "/images/user.png"
                      }
                      alt={review.userName}
                      className="w-full h-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="col-span-7 flex flex-col gap-2">
                    <h2>{review.userName}</h2>
                    <p className="text-xs leading-6 font-medium text-text">
                      {review.comment}
                    </p>
                  </div>
                  {/*Rates */}
                  <div className="col-span-3 flex flex-rows border-l border-border text-xs gap-1 text-star">
                    <Rating value={review.rating} />
                  </div>
                </div>
              ))
            ) : (
              <Empty message={`Be first to rate "${movie.name}"`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieRates;
