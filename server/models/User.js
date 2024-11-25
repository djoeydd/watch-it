const mongoose = require("mongoose");

// Schema for movies
const movieSchema = new mongoose.Schema({
  movieId: { type: String, required: true }, // Unique identifier for the movie
  title: { type: String, required: true }, // Movie title
  image: { type: String, required: true }, // URL of the movie poster
  watched: { type: Boolean, default: false }, // Whether the user has watched the movie
  favorite: { type: Boolean, default: false }, // If the movie is marked as a favorite
  rating: { type: Number, min: 0, max: 10, default: null }, // Rating out of 10
  inWatchlist: { type: Boolean, default: false }, // If added to the watchlist
});

// Schema for TV shows
const tvShowSchema = new mongoose.Schema({
  showId: { type: String, required: true }, // Unique identifier for the show
  title: { type: String, required: true }, // TV show title
  image: { type: String, required: true }, // URL of the show poster
  watched: { type: Boolean, default: false }, // Whether the user has watched the show
  favorite: { type: Boolean, default: false }, // If the show is marked as a favorite
  rating: { type: Number, min: 0, max: 10, default: null }, // Rating out of 10
  inWatchlist: { type: Boolean, default: false }, // If added to the watchlist
});

// Main user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // User's first name
  lastName: { type: String, required: true }, // User's last name
  email: { type: String, required: true, unique: true }, // User's email (must be unique)
  password: { type: String, required: true }, // Hashed password
  dob: { type: Date, required: true }, // Date of birth
  lastLogin: { type: Date, default: Date.now }, // Last login timestamp
  movies: [movieSchema], // Array of movies the user interacts with
  tvShows: [tvShowSchema], // Array of TV shows the user interacts with
});

// Export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
