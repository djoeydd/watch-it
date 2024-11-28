const crypto = require("crypto");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Create a new user
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Account with that email already exists" });
    }

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password, // Store password in plain text (not recommended)
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully.", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ message: "Error registering user", error });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("User:", user);
    if (!user) return res.status(404).json({ error: "User not found." });

    console.log("Plain text password:", password);
    console.log("Stored password:", user.password);

    if (password !== user.password) {
      console.log("Invalid credentials");
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed." });
  }
};

// Get a user by email
exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Add a movie to a user's list
exports.addMovieToUser = async (req, res) => {
  const { email } = req.params;
  const {
    movieId,
    title,
    image,
    watched,
    favorite,
    rating,
    inWatchlist,
    media_type,
  } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          movies: {
            movieId,
            title,
            image,
            watched,
            favorite,
            rating,
            inWatchlist,
            media_type,
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error adding movie", error });
  }
};

// Update a movie's status
exports.updateMovieStatus = async (req, res) => {
  const { email, movieId } = req.params;
  const { watched, favorite, rating } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email, "movies.movieId": movieId },
      {
        $set: {
          "movies.$.watched": watched,
          "movies.$.favorite": favorite,
          "movies.$.rating": rating,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User or Movie not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating movie", error });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting user", error });
  }
};
