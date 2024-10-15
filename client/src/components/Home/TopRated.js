import React, { useEffect, useState } from "react";
import Titles from "../Titles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { BsBookmarkStarFill, BsCaretLeft, BsCaretRight } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Start";
import Loader from "../../shared/Notification/Loader";
import { Empty } from "../../shared/Notification/Empty";
import { useDispatch, useSelector } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../../context/Functionaltes";

const Swipper = ({ prevEl, nextEl, movies }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };

  return (
    <Swiper
      navigation={{ nextEl, prevEl }}
      autoplay={true}
      speed={1000}
      loop={true}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        400: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="relative group">
            <div className="p-2 h-rate border border-border bg-dry rounded-lg overflow-hidden">
              <img
                src={movie?.titleImage ? movie?.titleImage : ""}
                alt={movie.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-full absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 hidden group-hover:flex flex-col justify-center items-center">
              <button
                onClick={() => LikeMovie(movie, dispatch, currentUser)}
                className={`w-12 h-12 flex items-center justify-center transitions 
      ${isLiked(movie) ? "bg-subMain" : "bg-white bg-opacity-30"}
      hover:bg-subMain rounded-full text-white`}
              >
                <FaHeart />
              </button>
              <Link
                to={`/movie/${movie._id}`}
                className="font-semibold text-xl truncated line-clamp-2 text-white mt-2"
              >
                {movie.name}
              </Link>
              <div className="flex gap-2 text-star">
                <Rating value={movie?.rate} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
function TopRated({ movies, isLoading }) {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const classNames =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";
  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <Swipper nextEl={nextEl} prevEl={prevEl} movies={movies} />
        ) : (
          <Empty message="Dont have any movie" />
        )}
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={classNames} ref={(node) => setPrevEl(node)}>
            <BsCaretLeft />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <BsCaretRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
