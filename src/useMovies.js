import { useState, useEffect } from "react";

/**
 * Custom hook to fetch movies from OMDb API.
 * @param {string} query - The search query string.
 * @param {Function} handleCloseMovie - Callback to close the movie details view.
 * @param {string} Key - The API key for OMDb.
 * @returns {Object} An object containing the movies list, loading state, and error message.
 */
export function useMovies(query, handleCloseMovie, Key) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      if (!navigator.onLine) {
        setError("You are offline. Please check your internet connection.");
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${Key}&s=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          console.error(err.message);
          if (err.message === "Failed to fetch") {
             setError("Something went wrong with fetching movies. Please check your connection.");
          } else {
             setError(err.message);
          }
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    const timer = setTimeout(() => {
      handleCloseMovie();
      fetchMovies();
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, handleCloseMovie, Key]);

  return { movies, isLoading, error };
}