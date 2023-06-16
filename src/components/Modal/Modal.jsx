import "./Modal.scss";
import React, { useMemo, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { BASE_IMG_URL } from "../../constants";
import FallbackImg from "../../imgs/Fallback_img.png";
import { Link } from "react-router-dom";
import { FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import useGenreConversion from "../../hooks/useGenreConversion";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/slices/favoritesSlices";
import { useDispatch, useSelector } from "react-redux";
import { capitalize, dateToYear } from "../../utils";
import {
  closeModal,
  selectIsFavorite,
  selectIsOpen,
  selectMovie,
} from "../../redux/slices/modalSlice";

function Modal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const movie = useSelector(selectMovie);
  const isFavorite = useSelector(selectIsFavorite);
  const [isFav, setIsFav] = useState(isFavorite);
  const {
    backdrop_path,
    genre_ids,
    original_title,
    title,
    name,
    adult,
    overview,
    release_date,
    first_air_date,
    vote_average,
    original_language,
  } = movie;
  const movieTitle = original_title || title || name;
  const genres = useGenreConversion(genre_ids);
  const genresString = genres ? genres.join(", ") : "Not available";
  const reducedDate = release_date
    ? dateToYear(release_date)
    : first_air_date
    ? dateToYear(first_air_date)
    : "Not Available";
  const maturity = adult
    ? "Suitable for adults only"
    : adult === undefined
    ? "Not available"
    : "Suitable for all ages";
  const backdropImage = useMemo(
    () => `${BASE_IMG_URL}/${backdrop_path}`,
    [backdrop_path]
  );

  const handleCloseModal = () => {
    setIsFav(isFavorite);
    dispatch(closeModal());
  };

  const addFavClickHandler = () => {
    setIsFav(true);
    dispatch(addToFavorites(movie));
  };

  const removeFavClickHandler = () => {
    setIsFav(false);
    dispatch(removeFromFavorites(movie));
  };

  return (
    <div className={`Modal__overlay ${!isOpen && "Modal__invisible"}`}>
      <div className={`Modal__wrap ${!isOpen && "Modal__invisible"}`}>
        <button className="Modal__closebtn" onClick={() => handleCloseModal()}>
          <VscChromeClose />
        </button>
        <div className="Modal__image--wrap">
          <div className="Modal__image--shadow" />
          <img
            className="Modal__image--img"
            src={backdrop_path ? backdropImage : FallbackImg}
            alt={movieTitle}
          />
          <div className="Modal__image--buttonswrap">
            <Link className="Modal__image--button">
              <FaPlay />
              <span>Play</span>
            </Link>
            {!isFav ? (
              <button
                className="Modal__image--button-circular"
                onClick={addFavClickHandler}
              >
                <FaPlus />
              </button>
            ) : (
              <button
                className="Modal__image--button-circular"
                onClick={removeFavClickHandler}
              >
                <FaMinus />
              </button>
            )}
            <button className="Modal__image--button-circular">
              <BiLike />
            </button>
          </div>
        </div>
        <div className="Modal__info--wrap">
          <h3 className="Modal__info--title">{movieTitle}</h3>
          <p className="Modal__info--description">{overview}</p>
          <hr className="Modal__info--line" />
          <h4 className="Modal__info--otherTitle">
            Info on <b>{movieTitle}</b>
          </h4>
          <div className="Modal__info--row">
            <span className="Modal__info--row-label">Genres: </span>
            <span className="Modal__info--row-description">{genresString}</span>
          </div>
          <div className="Modal__info--row">
            <span className="Modal__info--row-label">
              {release_date ? "Release date: " : "First air date: "}
            </span>
            <span className="Modal__info--row-description">{reducedDate}</span>
          </div>
          <div className="Modal__info--row">
            <span className="Modal__info--row-label">Average vote: </span>
            <span className="Modal__info--row-description">
              {vote_average || "Not available"}
            </span>
          </div>
          <div className="Modal__info--row">
            <span className="Modal__info--row-label">Original language: </span>
            <span className="Modal__info--row-description">
              {capitalize(original_language)}
            </span>
          </div>
          <div className="Modal__info--row">
            <span className="Modal__info--row-label">Age classification: </span>
            <span className="Modal__info--row-description">{maturity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
