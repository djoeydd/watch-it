const dotenv = require("dotenv");
const { query } = require("express");

dotenv.config();

const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY; // Store your TMDB API key in the .env file

const getTrendingMovies = async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const url = `${TMDB_API_URL}/trending/movie/week?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
};

const getInTheaters = async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const url = `${TMDB_API_URL}/movie/now_playing?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
};

const getTrendingTV = async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const url = `${TMDB_API_URL}/trending/tv/week?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
};

const getMovieDetails = async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const url = `${TMDB_API_URL}/movie/${req.params.id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
};

const getMovieLogos = async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const url = `${TMDB_API_URL}/movie/${req.params.id}/images?language=en`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
};

const discoverMovies = async (req, res) => {
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(
      ([_, value]) => value !== undefined && value !== null
    )
  );
  console.log("qp---", queryParams);
  const queryString = new URLSearchParams(filteredParams).toString();
  console.log(queryString);
  const tmdbURL = `${TMDB_API_URL}/discover/${queryString}`;

  const fetch = (await import("node-fetch")).default;
  const url = `${tmdbURL}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
};

const getTvLogos = async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const url = `${TMDB_API_URL}/tv/${req.params.id}/images?language=en`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
};

const getMovieVideos = async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const url = `${TMDB_API_URL}/movie/${req.params.id}/videos?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
};

module.exports = {
  getTrendingMovies,
  getTrendingTV,
  getMovieDetails,
  getMovieLogos,
  getMovieVideos,
  getInTheaters,
  getTvLogos,
  discoverMovies,
};
