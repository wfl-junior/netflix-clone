import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    language: "en-US",
    api_key: process.env.TMDB_API_KEY,
  },
});
