import axios from "./axiosMovies";

export function getOneMonthAgoReleaseDate() {
  let date = new Date();
  date.setMonth(date.getMonth() - 1);
  let formattedDate = date.toJSON().slice(0, 10);

  return formattedDate;
}

export async function genreTopVideos(genres, type) {
  let url;
  if (type === "tv") {
    url = `discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&include_null_first_air_dates=false&with_genres=`;
  } else if (type === "movie") {
    url = `discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=`;
  }

  const genreRequestArray = [];
  genres.slice(0, 15).forEach((genre) => {
    let newUrl = url;
    newUrl += genre.id.toString();
    genreRequestArray.push(
      axios
        .get(newUrl)
        .then((response) => ({
          title: genre.name,
          videos: response.data.results,
        }))
    );
  });

  try {
    return await Promise.all(genreRequestArray);
  } catch (error) {
    throw new Error(error);
  }
}

export const setCookie = (name, value, days) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
};

export const getCookie = (name) => {
  const encodedName = encodeURIComponent(name);
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(encodedName + "=")) {
      return decodeURIComponent(cookie.substring(encodedName.length + 1));
    }
  }

  return null;
};

export const removeCookie = (name) => {
  const cookieValue = `${encodeURIComponent(
    name
  )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = cookieValue;
};
