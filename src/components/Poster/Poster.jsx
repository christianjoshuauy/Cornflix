import "./Poster.scss";
import React from "react";
import { FaPlus, FaMinus, FaPlay, FaChevronDown } from "react-icons/fa";
import { BASE_IMG_URL } from "../../constants";
import FallbackImg from "../../imgs/Fallback_img.png";
import useGenreConversion from "../../hooks/useGenreConversion";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToFavorites } from "../../redux/slices/favoritesSlices";
import { removeFavorite } from "../../firebase/firebase";

export default function Poster({ movie, isLarge, isFavorite = false }) {
  const {
    backdrop_path,
    genre_ids,
    original_title,
    overview,
    poster_path,
    release_date,
    title,
    name,
    vote_average,
  } = movie;
  const movieTitle = original_title || title || name;
  const genres = useGenreConversion(genre_ids);
  const posterImage = useMemo(
    () => `${BASE_IMG_URL}/${poster_path}`,
    [poster_path]
  );
  const backdropImage = useMemo(
    () => `${BASE_IMG_URL}/${backdrop_path}`,
    [backdrop_path]
  );
  const dispatch = useDispatch();

  const addFavClickHandler = () => {
    dispatch(addToFavorites(movie));
  };

  const removeFavClickHandler = () => {
    dispatch(removeFavorite(movie));
  };

  return (
    <div className={`Poster ${isLarge && "Poster--big"}`}>
      {isLarge ? (
        poster_path ? (
          <img src={posterImage} alt={movieTitle} />
        ) : (
          ""
        )
      ) : backdrop_path ? (
        <img src={backdropImage} alt={movieTitle} />
      ) : (
        <React.Fragment>
          <img src={FallbackImg} alt={movieTitle} />
          <div className="Poster__fallback">
            <span>{movieTitle}</span>
          </div>
        </React.Fragment>
      )}
      <div className="Poster-info">
        <div className="Poster-info--iconswrp">
          <a className="Poster-info--icon icon--play">
            <FaPlay />
          </a>
          {!isFavorite ? (
            <button
              className="Poster-info--icon icon--favourite"
              onClick={() => addFavClickHandler()}
            >
              <FaPlus />
            </button>
          ) : (
            <button
              className="Poster-info--icon icon--favourite"
              onClick={() => removeFavClickHandler()}
            >
              <FaMinus />
            </button>
          )}
          <button className="Poster-info--icon icon--toggleModal">
            <FaChevronDown />
          </button>
        </div>
        <div className="Poster-info--title">
          <h3>{movieTitle}</h3>
        </div>
        <div className="Poster-info--genres">
          {genres &&
            genres.map((genre) => (
              <span key={`Genre--id_${genre}`} className="genre-title">
                {genre}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
