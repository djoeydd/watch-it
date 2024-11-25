const User = require("../models/User");

// Create a new user
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, dob, movies, tvShows } =
    req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      dob,
      lastLogin: new Date(),
      movies: movies || [],
      tvShows: tvShows || [],
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
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
  const { movieId, title, image, watched, favorite, rating, inWatchlist } =
    req.body;

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
