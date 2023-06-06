import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner/Banner";
import Carousel from "../../components/Carousel/Carousel";
import { fetchMovies, selectMovies } from "../../redux/slices/movieSlice";
import {
  fetchNetflixOriginals,
  selectAllNetflixOriginals,
  selectNetflixError,
} from "../../redux/slices/netflixOriginalsSlice";
import {
  fetchTopRated,
  selectAllTopRated,
  selectTopRatedError,
} from "../../redux/slices/topRatedSlice";
import {
  fetchTrending,
  selectAllTrending,
  selectTrendingError,
} from "../../redux/slices/trendingSlice";
import { fetchTvShow, selectTvShow } from "../../redux/slices/tvShowSlice";

export default function Home() {
  const dispatch = useDispatch();
  const trending = useSelector(selectAllTrending);
  const topRated = useSelector(selectAllTopRated);
  const netflixOriginals = useSelector(selectAllNetflixOriginals);
  const { genres: movieGenres, status: movieStatus } =
    useSelector(selectMovies);
  const { genres: seriesGenres, status: seriesStatus } =
    useSelector(selectTvShow);

  const trendingError = useSelector(selectTrendingError);
  const topRatedError = useSelector(selectTopRatedError);
  const netflixError = useSelector(selectNetflixError);

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchTopRated());
    dispatch(fetchNetflixOriginals());
    if (movieStatus === "idle") {
      dispatch(fetchMovies());
    }
    if (seriesStatus === "idle") {
      dispatch(fetchTvShow());
    }
  }, [movieStatus, seriesStatus, dispatch]);

  let rows = [];
  if (!trendingError && !topRatedError && !netflixError) {
    rows.push({ title: "Trending Now", videos: trending });
    rows.push({ title: "Popular on Cornflix", videos: topRated });
    rows.push({ title: "Cornflix Originals", videos: netflixOriginals });
    movieGenres.slice(0, 5).forEach((genre) => {
      rows.push({ title: genre.title + " Movies", videos: genre.videos });
    });
    seriesGenres.slice(0, 5).forEach((genre) => {
      rows.push({ title: genre.title + " TV", videos: genre.videos });
    });
  }

  const [firstMovie, ...otherMovies] = rows[0].videos;

  return (
    <div className="Home">
      <Banner movie={firstMovie} />
      {rows &&
        rows.map((row, i) => (
          <Carousel
            key={row.title}
            title={row.title}
            movies={i === 0 ? otherMovies : row.videos}
          />
        ))}
    </div>
  );
}
