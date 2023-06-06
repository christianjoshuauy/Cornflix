export const LANG = "en-US";
export const REGION = "US";
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
const { REACT_APP_TMDB_API_KEY } = process.env;
export const fetchSearchQuery = `search/multi?api_key=${REACT_APP_TMDB_API_KEY}&language=${LANG}&query=`;
