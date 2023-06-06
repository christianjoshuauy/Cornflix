import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../components/Banner/Banner";
import Carousel from "../../components/Carousel/Carousel";
import { fetchLatest, selectLatest } from "../../redux/slices/latestSlice";
import {
  selectAllTopRated,
  selectTopRatedError,
} from "../../redux/slices/topRatedSlice";

export default function Popular() {
  const dispatch = useDispatch();
  const { latest, status } = useSelector(selectLatest);
  const topRated = useSelector(selectAllTopRated);

  const topRatedError = useSelector(selectTopRatedError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLatest());
    }
  }, [status, dispatch]);

  let rows = [];
  if (!topRatedError) {
    rows.push({ title: "Popular on Cornflix", videos: topRated });
    latest.forEach((genre) => {
      rows.push({ title: genre.title, videos: genre.videos });
    });
  }

  const [firstLatest, ...otherLatest] = rows[0].videos;

  return (
    <div className="Popular">
      <Banner movie={firstLatest} />
      {rows &&
        rows.map((row, i) => (
          <Carousel
            key={row.title}
            title={row.title}
            movies={i === 0 ? otherLatest : row.videos}
          />
        ))}
    </div>
  );
}
