import "./Searchbar.scss";
import React from "react";
import { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearSearchValue,
  fetchSearchResults,
  getSearchValue,
} from "../../redux/slices/searchSlice";

export default function Searchbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef();

  function handleSearchInput(event) {
    const { value } = event.target;
    setSearchInput(value);
    dispatch(getSearchValue(value));

    if (value.length > 0) {
      navigate(`/search?q=${value}`);
      dispatch(fetchSearchResults(value));
    } else {
      navigate("/browse");
      dispatch(clearSearchValue());
    }
  }

  return (
    <div className="Searchbar__container--left">
      <FiSearch className="logo" />
      <input
        type="text"
        placeholder="Titles, people, genres"
        value={searchInput}
        onChange={handleSearchInput}
        ref={searchInputRef}
        className="Searchbar__container--left__input"
      />
    </div>
  );
}
