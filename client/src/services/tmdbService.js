const API_BASE_URL = "https://watch-it-20w0.onrender.com/api/tmdb";

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

/**
 * Fetch movies from the backend with dynamic query parameters
 * @param {Object} params - An object containing the search parameters
 * @returns {Promise<Object>} - The JSON response from the TMDB API
 */
export async function discoverMovies(params = {}) {
  // Create the query string from the params object
  const queryParams = new URLSearchParams(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== null
    ) // Filter out undefined/null
  );
  const url = `https://api.themoviedb.org/3/discover/movie?${queryParams.toString()}`;
  console.log("query params: ", queryParams);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmY1MWZjZDYzYTJmZWExODNmYzBlN2QxY2U5Y2IyYyIsIm5iZiI6MTczMjM1NzYyNC4zMTUxNjQ2LCJzdWIiOiI2NzM4OWRlNjljMTZkYWZhMDZmOWExMmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VFDv4IRyRh05K02Cn8wDqbBg9Tu_FhriqibX43rXkXw",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    const data = await response.json();

    const moviesWithLogos = await Promise.all(
      data.results.map(async (movie) => {
        const logo = await fetchMovieLogos(movie.id);
        return { ...movie, logo, media_type: "movie" };
      })
    );

    return { ...data, results: moviesWithLogos };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

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
