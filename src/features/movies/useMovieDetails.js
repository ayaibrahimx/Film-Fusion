import { useEffect } from 'react';
const API_KEY = '3a60a40913f34c427412e53b6b852fc3';

function useMovieDetails({ setMovieDetails, movieId }) {
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`,
        );

        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId, setMovieDetails]);
}

export default useMovieDetails;
