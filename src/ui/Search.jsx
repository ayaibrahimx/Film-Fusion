import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CloseOutsideModal from './CloseOutsideModal';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '3a60a40913f34c427412e53b6b852fc3';

function Search({ searchedMovie, setShowMovies, setSearchedMovie }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const responseMovies = await fetch(
          `${API_URL}/search/movie?query=${searchedMovie}&api_key=${API_KEY}`,
        );
        const responseTVShows = await fetch(
          `${API_URL}/search/tv?query=${searchedMovie}&api_key=${API_KEY}`,
        );

        if (!responseMovies.ok || !responseTVShows.ok) {
          throw new Error('Failed to fetch search results');
        }

        const dataMovies = await responseMovies.json();
        const dataTVShows = await responseTVShows.json();

        // Add media_type to each result
        const moviesWithType = dataMovies.results.map((movie) => ({
          ...movie,
          media_type: 'movie',
        }));

        const tvShowsWithType = dataTVShows.results.map((tvShow) => ({
          ...tvShow,
          media_type: 'tv',
        }));

        const uniqueMovies = Array.from(
          new Set(moviesWithType.map((movie) => movie.title)),
        ).map((title) => {
          return moviesWithType.find((movie) => movie.title === title);
        });

        const uniqueTVShows = Array.from(
          new Set(tvShowsWithType.map((tvShow) => tvShow.name)),
        ).map((name) => {
          return tvShowsWithType.find((tvShow) => tvShow.name === name);
        });

        const displayedResults = [...uniqueMovies, ...uniqueTVShows].slice(
          0,
          9,
        );
        setSearchResults(displayedResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]); // Clear previous results
      }
    };

    if (searchedMovie) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchedMovie]);

  return (
    <CloseOutsideModal
      onClose={() => {
        setShowMovies(false);
        setSearchedMovie('');
      }}
    >
      <div className="absolute right-2 top-full z-10 m-auto flex max-h-fit w-fit cursor-pointer rounded-md bg-stone-900 bg-opacity-50 px-6 md:flex-row">
        <ul className="h-fit w-56">
          {searchResults.length === 0 ? (
            <p className="flex justify-center overflow-y-auto p-2 text-center text-red-500">
              Enter a valid movie or TV show
            </p>
          ) : (
            searchResults.map((item) => (
              <Link
                to={
                  item.media_type === 'movie'
                    ? `/movies/${item.id}`
                    : `/tvshows/${item.id}`
                }
                key={item.id}
              >
                <span className="flex overflow-y-auto p-2 shadow-md transition-all duration-300 hover:scale-105">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt="poster"
                    className="mb-1 mr-2 h-8 w-8 rounded-full"
                  />
                  <li key={item.id} className="w-40 hover:text-[#e50914]">
                    {item.title || item.name}
                  </li>
                </span>
              </Link>
            ))
          )}
        </ul>
      </div>
    </CloseOutsideModal>
  );
}

export default Search;
