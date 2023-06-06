import "./Banner.scss";
import React from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { useMemo } from "react";

export default function Banner(props) {
  const { movie } = props;
  const {
    backdrop_path,
    original_title,
    title,
    name,
    overview,
    genre_ids,
    release_date,
    poster_path,
  } = movie ? movie : {};
  const img_url = useMemo(
    () =>
      `url(https://image.tmdb.org/t/p/original//${
        backdrop_path ? backdrop_path : poster_path
      })`,
    [backdrop_path, poster_path]
  );
  return (
    <header className="Banner" style={{ backgroundImage: img_url }}>
      <div className="Banner--content">
        <h1 className="Banner--content--title">
          {original_title ? original_title : title ? title : name}
        </h1>
        <p className="Banner--content--description">{overview}</p>
        <div className="Banner--buttons">
          <button className="Banner--button">
            {" "}
            {/*Link*/}
            <FaPlay />
            <span>Play</span>
          </button>
          <button className="Banner--button">
            <BiInfoCircle />
            <span>More info</span>
          </button>
        </div>
      </div>
      <div className="Banner--panel"></div>
      <div className="Banner--bottom-shadow"></div>
    </header>
  );
}
