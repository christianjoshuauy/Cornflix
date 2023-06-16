import "./Banner.scss";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { selectFavorites } from "../../redux/slices/favoritesSlices";

export default function Banner(props) {
  const dispatch = useDispatch();
  const { movie } = props;
  const favorites = useSelector(selectFavorites);
  const { backdrop_path, original_title, title, name, overview, poster_path } =
    movie ? movie : {};
  const img_url = useMemo(
    () =>
      `url(https://image.tmdb.org/t/p/original//${
        backdrop_path ? backdrop_path : poster_path
      })`,
    [backdrop_path, poster_path]
  );

  function isFavorite(movie) {
    return favorites.some((favorite) => favorite.id === movie.id);
  }

  function handleInfoClick(mov, fav) {
    dispatch(openModal({ movie: movie, isFavorite: isFavorite(movie) }));
  }

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
            <FaPlay />
            <span>Play</span>
          </button>
          <button className="Banner--button" onClick={handleInfoClick}>
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
