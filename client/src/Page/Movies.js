import React, { useEffect, useMemo, useState } from "react";
import Filters from "../components/Filter";
import Layout from "../Layout/Layout";
import {
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../Data/FilterData";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Toast from "../shared/Toast";
import { fetchMovies } from "../redux/movieSlice/movieSlice";
import Loader from "../shared/Notification/Loader";
import Pagination from "../components/Pagination";
import { RiMovie2Line } from "react-icons/ri";
import Movie from "../components/Movie";
function Filter() {
  const dispatch = useDispatch();
  const { search } = useParams();
  const [category, setCategory] = useState({
    title: "All Categories",
    value: null,
  });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);
  const { categories } = useSelector((state) => state.category);
  const { movies, error, loading, page, pages, totalMovies } = useSelector(
    (state) => state.movie
  );
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?.title,
      time: times?.title.replace(/\D/g, ""),
      language: language?.title === "Sort by Languages" ? "" : language?.title,
      rate: rates?.title.replace(/\D/g, ""),
      year: year?.title.replace(/\D/g, ""),
      search: search ? search : " ",
    };
    return query;
  }, [category, times, language, rates, year, search]);
  //use effect
  useEffect(() => {
    //errors
    if (error) {
      Toast(error, "ERROR");
    }
    //get all movies
    dispatch(fetchMovies(queries));
  }, [dispatch, error, queries]);
  const hanldePage = (page) => {
    dispatch(
      fetchMovies({
        ...queries,
        pageNumber: page,
      })
    );
  };

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
    search: search,
  };

  return (
    <Layout>
      <div className="px-4">
        <Filters data={datas} />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-green-400">
            {totalMovies ? totalMovies : 0}
          </span>{" "}
          items found {search && `for  "${search}" `}
        </p>
        {loading ? (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-5 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6 ">
              {movies.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>
            <Pagination page={page} pages={pages} onPageChange={hanldePage} />
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl felx-colo">
              <RiMovie2Line />
            </div>
            <p className="text-white text-sm">
              It seem's like we dont have any movies
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Filter;
