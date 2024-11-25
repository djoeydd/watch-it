const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserByEmail,
  addMovieToUser,
  updateMovieStatus,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Routes
router.post("/", createUser); // Create a user
router.get("/", getAllUsers); // Get all users
router.get("/:email", getUserByEmail); // Get user by email
router.post("/:email/movies", addMovieToUser); // Add a movie to user
router.patch("/:email/movies/:movieId", updateMovieStatus); // Update movie status
router.delete("/:email", deleteUser); // Delete user

module.exports = router;
