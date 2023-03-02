import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "2358f9240794e5caa7d50309b01d37b8",
    language: "pt-BR",
    include_adult: false,
  },
});

export default api;
