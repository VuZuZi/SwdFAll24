import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { HiLogin, HiOutlineFilm } from "react-icons/hi";
import { TbCrown } from "react-icons/tb";
import { RiContactsFill } from "react-icons/ri";
import { RiBox3Fill } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies/${search}`);
      setSearch(search);
    } else {
      navigate("/movies");
    }
  };
  const { currentUser } = useSelector((state) => state.user);
  const { likedMovies } = useSelector((state) => state.favorite);

  return (
    <div className="bg-main shadow-md sticky top-0 z-20 ">
      <div className=" container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between">
        <div className="col-span-1 mx-auto lg:block hidden">
          <Link to="/">
            <img
              src="/images/logo1.png"
              alt="Monterhub"
              className="w-12 h-12 object-contain object-center"
            />
          </Link>
        </div>
        <div className="col-span-2">
          <form className="w-full rounded flex" onSubmit={handleSearch}>
            <input
              placeholder="Search Movie Name From here"
              className="w-full font-medium placeholder:text-border bg-transparent text-sm border border-border rounded-lg px-2 py-2"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-subMain rounded-lg px-2" type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="col-span-4 font-medium text-sm hidden xl:gap-8 justify-between lg:flex xl:justify-center items-center ">
          <NavLink
            to="/movies"
            className="hover:text-subMain transitions text-white flex gap-2 justify-end items-center"
          >
            <HiOutlineFilm className="w-6 h-6" />
            Movies
          </NavLink>
          <NavLink
            to="/premium"
            className="hover:text-subMain transitions text-white flex gap-2 justify-end items-center"
          >
            <TbCrown className="w-6 h-6 text-yellow-400" />
            Premium Account
          </NavLink>
          <NavLink
            to="/about-us"
            className="hover:text-subMain transitions text-white flex gap-2 justify-end items-center"
          >
            <RiBox3Fill className="w-6 h-6" />
            About US
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-subMain transitions text-white flex gap-2 justify-end items-center"
          >
            <RiContactsFill className="w-6 h-6" />
            Contact
          </NavLink>
          <NavLink
            to={
              currentUser?.isAdmin
                ? "/dashboard"
                : currentUser
                ? "/profile"
                : "/sign-in"
            }
            className="hover:text-subMain transitions text-white flex gap-2 justify-end items-center"
          >
            {currentUser ? (
              <img
                src={
                  currentUser?.avatar ? currentUser?.avatar : "/images/user.png"
                }
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full border object-cover border-subMain"
              />
            ) : (
              <>
                <div className="flex bg-subMain p-2 rounded-lg hover:bg-white hover:text-dry">
                  <HiLogin className="w-6 h-6" />
                  <p>Login</p>
                </div>
              </>
            )}
          </NavLink>
          <NavLink
            to="/favorites"
            className={`hover:text-subMain transitions text-white flex gap-2 justify-end items-center relative`}
          >
            <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1 ">
              {likedMovies ? likedMovies.length : 0}
            </div>
            <FiHeart className="w-6 h-6" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
