import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import {
  addToList,
  removeFromList,
  toggleFavorite,
} from '../features/mediaSlice';

function MovieButtons({ movie, closeModal, className, type }) {
  const [isInList, setIsInList] = useState(false);
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const mediaState = useSelector((state) => state.media);

  console.log(mediaState.movies);

  useEffect(() => {
    // Check if movie is in the list
    setIsInList(
      type === 'movies'
        ? mediaState.movies.some((m) => m.id === parseInt(movieId || movie.id))
        : mediaState.tvShows.some(
            (m) => m.id === parseInt(movieId || movie.id),
          ),
    );
  }, [mediaState.movies, movieId, movie.id, mediaState.tvShows, type]);

  const addToMyList = (movie) => {
    if (!isInList) {
      dispatch(addToList({ item: movie, type }));
      dispatch(toggleFavorite({ item: movie, type }));
    } else {
      dispatch(removeFromList({ item: movie, type }));
    }
    setIsInList(!isInList);
  };

  return (
    <div className={className}>
      <button
        className="mr-3 flex rounded-md border-2 px-2 py-1 hover:rounded-md hover:bg-gray-200 hover:bg-opacity-50 hover:text-[#e50914] max-sm:text-sm"
        onClick={() => closeModal(true)}
      >
        <FaPlay className="mx-1 my-auto" />
        Watch Trailer
      </button>
      <button
        className="flex px-2 py-1 hover:rounded-md hover:bg-gray-200 hover:bg-opacity-50 hover:text-[#e50914]"
        onClick={() => addToMyList(movie)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform ${isInList ? 'rotate-45 text-[#e50914] transition-all duration-300' : '-rotate-90 transition-all duration-300'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span
          className={
            isInList ? 'text-[#e50914] max-sm:text-sm' : 'max-sm:text-sm'
          }
        >
          {isInList ? 'Remove from list' : 'Add to list'}
        </span>
      </button>
    </div>
  );
}

export default MovieButtons;
