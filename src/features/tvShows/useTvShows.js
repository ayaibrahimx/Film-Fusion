import { useEffect, useState } from 'react';
import { useCurrentPage } from '../../context/CurrentPageContext';
import { useFilterAndSort } from '../../context/FilterAndSortContext';

const API_KEY = '3a60a40913f34c427412e53b6b852fc3';
const API_URL = 'https://api.themoviedb.org/3';

const useTvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const { currentPage } = useCurrentPage();
  const { sortConfig, selectedTvShowGenre } = useFilterAndSort();

  // Save sorting preferences to localStorage whenever sortConfig.sortBy changes
  useEffect(() => {
    localStorage.setItem('sortBy', sortConfig.sortBy);
  }, [sortConfig.sortBy]);

  useEffect(() => {
    const fetchTvShows = async () => {
      setIsLoading(true); // Set isLoading to true when fetching starts
      try {
        const res = await fetch(
          `${API_URL}/discover/tv?api_key=${API_KEY}&page=${currentPage}&sort_by=${sortConfig.sortBy}&include_adult=false&vote_count.gte=200${selectedTvShowGenre.length > 0 ? `&with_genres=${[...selectedTvShowGenre].join(',')}` : ''}`,
        );

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        setTvShows(data.results.slice(0, 20));
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
        setError(error.message);
      } finally {
        setIsLoading(false); // Set isLoading to false regardless of success or failure
      }
    };

    fetchTvShows();
  }, [currentPage, sortConfig.sortBy, selectedTvShowGenre]);

  const getTrailer = async (tvShowId) => {
    try {
      const response = await fetch(
        `${API_URL}/tv/${tvShowId}/videos?api_key=${API_KEY}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch trailer');
      }
      const data = await response.json();
      const trailer = data.results.find(
        (video) =>
          video.type === 'Trailer' ||
          video.site === 'YouTube' ||
          video.type === 'Clip',
      );

      return trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';
    } catch (error) {
      console.error('Error fetching trailer:', error);
      return '';
    }
  };

  return { tvShows, error, totalPages, isLoading, getTrailer }; // Include isLoading in the return object
};

export default useTvShows;
