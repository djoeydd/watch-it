const express = require("express");
const {
  getTrendingMovies,
  getTrendingTV,
  getMovieDetails,
  getMovieLogos,
  getMovieVideos,
  getInTheaters,
  getTvLogos,
} = require("../controllers/tmdbController");

const router = express.Router();

// Routes for TMDb API
router.get("/trending/movies", getTrendingMovies); // Fetch trending movies
router.get("/trending/tv", getTrendingTV); // Fetch trending TV shows
router.get("/movie/:id", getMovieDetails); // Fetch movie details by ID
router.get("/movie/:id/logos", getMovieLogos); // Fetch movie images by ID
router.get("/movie/:id/videos", getMovieVideos); // Fetch movie videos by ID
router.get("/in-theaters", getInTheaters); // Fetch in-theater movies
router.get("/tv/:id/logos", getTvLogos); // Fetch TV logos by ID

module.exports = router;
