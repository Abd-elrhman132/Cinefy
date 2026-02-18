import { useState, useCallback } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";
import NavBar, { Logo, Search, NumResults } from "./NavBar";
import Box from "./Box";
import Loader from "./Loader";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";

const Key = process.env.REACT_APP_OMDB_KEY;

if (!Key) {
  console.warn("OMDb API Key is missing. Please set REACT_APP_OMDB_KEY in your environment variables.");
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage("watched", []);

  function handleselectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  const handleCloseMovie = useCallback(function () {
    setSelectedId(null);
  }, []);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie, Key);

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box title="Search Results">
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleselectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box title={selectedId ? "Movie Details" : "Your Library"}>
          {selectedId ?
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
              apiKey={Key}
            />
          : <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          }
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="error">
      <span>{message}</span>
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
