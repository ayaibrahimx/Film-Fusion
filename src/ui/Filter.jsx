import toast from 'react-hot-toast';
import { useFilterAndSort } from '../context/FilterAndSortContext';
import { useCurrentPage } from '../context/CurrentPageContext';
import { useLocation } from 'react-router-dom';

function Filter() {
  const {
    selectedMovieGenre,
    setSelectedMovieGenre,
    selectedTvShowGenre,
    setSelectedTvShowGenre,
  } = useFilterAndSort();

  const { setCurrentPage } = useCurrentPage();
  const location = useLocation();

  const moviesGenres = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Drama: 18,
    Fantasy: 14,
    Horror: 27,
    Mystery: 9648,
    Romance: 10749,
    'TV Movie': 10770,
    Thriller: 53,
    Documentary: 99,
    Family: 10751,
    Music: 10402,
    War: 10752,
    Western: 37,
    History: 36,
    'Science Fiction': 878,
  };

  const tvShowGenres = {
    'Action & Adventure': 10759,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Kids: 10762,
    Mystery: 9648,
    News: 10763,
    Reality: 10764,
    'Sci-Fi & Fantasy': 10765,
    Soap: 10766,
    Talk: 10767,
    'War & Politics': 10768,
    Western: 37,
  };

  let genres;
  let selectedGenre;
  let setSelectedGenre;

  if (location.pathname === '/tvshows') {
    genres = tvShowGenres;
    selectedGenre = selectedTvShowGenre;
    setSelectedGenre = setSelectedTvShowGenre;
  } else {
    genres = moviesGenres;
    selectedGenre = selectedMovieGenre;
    setSelectedGenre = setSelectedMovieGenre;
  }

  const handleAddRemoveGenre = (e) => {
    const genre = e.target.textContent;
    const genreId = genres[genre];

    if (selectedGenre.includes(genreId)) {
      setSelectedGenre((prevGenres) => prevGenres.filter((g) => g !== genreId));
    } else if (selectedGenre.length < 3) {
      setSelectedGenre((prevGenres) => [...prevGenres, genreId]);
      setCurrentPage(1);
    } else {
      toast.error('You can only add 3 genres!', {
        style: { background: '#1C1917', color: '#F1F5F9' },
      });
    }
  };

  const getGenreButtonClassName = (genre) => {
    const genreId = genres[genre];
    return `rounded-md border-solid border-slate-200 p-2 text-sm font-bold hover:bg-gray-100 hover:bg-opacity-50 hover:text-[#e50914] ${
      selectedGenre.includes(genreId)
        ? 'bg-gray-100 text-[#e50914] mx-2 my-2'
        : 'text-slate-100'
    }`;
  };

  return (
    <>
      <p className="mt-8 font-truculenta font-extrabold text-slate-100">
        Genres
      </p>

      <span className="mt-4 flex flex-wrap">
        {Object.entries(genres).map(([genre, id]) => (
          <button
            key={id}
            className={getGenreButtonClassName(genre)}
            onClick={handleAddRemoveGenre}
          >
            {genre}
          </button>
        ))}
      </span>
    </>
  );
}

export default Filter;
