const express = require("express");
const {
  registerUser,
  verifyUser,
  loginUser,
  getUserByEmail,
  addMovieToUser,
  updateMovieStatus,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.get("/verify", verifyUser);
router.post("/login", loginUser);
router.get("/:email", getUserByEmail); // Get user by email
router.post("/:email/movies", addMovieToUser); // Add a movie to user
router.patch("/:email/movies/:movieId", updateMovieStatus); // Update movie status
router.delete("/:email", deleteUser); // Delete user

module.exports = router;
