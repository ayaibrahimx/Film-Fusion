import { useEffect } from 'react';
const API_KEY = '3a60a40913f34c427412e53b6b852fc3';

function useTvShowDetails({ setTvShowDetails, tvShowId }) {
  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${API_KEY}`,
        );

        const data = await response.json();
        setTvShowDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchTvShowDetails();
  }, [tvShowId, setTvShowDetails]);
}

export default useTvShowDetails;
