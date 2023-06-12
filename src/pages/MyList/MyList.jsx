import "./MyList.scss";
import React from "react";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/slices/favoritesSlices";
import Poster from "../../components/Poster/Poster";

export default function MyList() {
  const favorites = useSelector(selectFavorites);

  return (
    <div className="MyList">
      <h2 className="Search__title">Your Favorites</h2>
      <div className="MyList__wrap">
        {favorites && favorites.length > 0 ? (
          favorites.map((favorite) => (
            <Poster movie={favorite} isLarge={false} isFavorite={true} />
          ))
        ) : (
          <h2 className="MyList__title">
            You have no movies in your list yet.
          </h2>
        )}
      </div>
    </div>
  );
}
