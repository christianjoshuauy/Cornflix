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
      axios.get(newUrl).then((response) => ({
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
