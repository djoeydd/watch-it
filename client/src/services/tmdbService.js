const API_BASE_URL = "http://localhost:5001/api/tmdb";

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trending/movies`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const moviesWithLogos = await Promise.all(
      data.results.map(async (movie) => {
        const logo = await fetchMovieLogos(movie.id);
        return { ...movie, logo };
      })
    );

    return { ...data, results: moviesWithLogos };
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchTrendingTV = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trending/tv`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending TV shows:", error);
    throw error;
  }
};

export const fetchInTheaters = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movie/now_playing?language=en-US&page=1`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching in-theater movies:", error);
    throw error;
  }
};

export const fetchMovieLogos = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movie/${id}/logos`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const logo =
      data.logos && data.logos.length > 0 ? data.logos[0].file_path : null;
    return logo;
  } catch (error) {
    console.error("Error fetching movie logos:", error);
    throw error;
  }
};

export const fetchTvLogos = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tv/${id}/logos`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const logo =
      data.logos && data.logos.length > 0 ? data.logos[0].file_path : null;
    return logo;
  } catch (error) {
    console.error("Error fetching movie logos:", error);
    throw error;
  }
};

export const fetchMovieVideos = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movie/${id}/videos`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const trailers = data.results.filter((video) => video.type === "Trailer");

    // Check if teasers array is not empty before accessing the key property
    const videoKey = trailers.length > 0 ? trailers[0].key : null;
    return videoKey;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movie/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
