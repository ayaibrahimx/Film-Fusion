import { useCallback, useEffect, useState } from 'react';
import { useCurrentPage } from '../../context/CurrentPageContext';
import { useFilterAndSort } from '../../context/FilterAndSortContext';

const API_KEY = '3a60a40913f34c427412e53b6b852fc3';
const API_URL = 'https://api.themoviedb.org/3';

function useMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentPage } = useCurrentPage();
  const [totalPages, setTotalPages] = useState(1);
  const { selectedMovieGenre } = useFilterAndSort();

  const { sortConfig } = useFilterAndSort();
  useEffect(() => {
    const saveSortingPreferences = () => {
      localStorage.setItem('sortBy', sortConfig.sortBy);
    };
    saveSortingPreferences();
  }, [sortConfig.sortBy]);

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(
        `${API_URL}/discover/movie?api_key=${API_KEY}&page=${currentPage}&sort_by=${encodeURIComponent(sortConfig.sortBy)}&include_adult=false&vote_count.gte=200${selectedMovieGenre.length > 0 ? `&with_genres=${[...selectedMovieGenre].join(',')}` : ''}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      setMovies(data.results.slice(0, 20));
      setTotalPages(data.total_pages);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMovieGenre, currentPage, sortConfig.sortBy]);

  useEffect(() => {
    fetchMovies();
  }, [currentPage, sortConfig.sortBy, selectedMovieGenre, fetchMovies]);

  const getTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch trailer');
      }
      const data = await response.json();
      const trailer = data.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube',
      );
      return trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';
    } catch (error) {
      console.error('Error fetching trailer:', error);
      return '';
    }
  };

  return {
    movies,
    isLoading,
    error,
    currentPage,
    totalPages,
    fetchMovies,
    getTrailer,
  };
}

export default useMovies;
