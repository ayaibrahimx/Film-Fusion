import { createContext, useContext, useState } from 'react';
import { useCurrentPage } from './CurrentPageContext';

const FilterAndSortContext = createContext();

export const FilterAndSortProvider = ({ children }) => {
  const [selectedMovieGenre, setSelectedMovieGenre] = useState([]);
  const [selectedTvShowGenre, setSelectedTvShowGenre] = useState([]);
  const { setCurrentPage } = useCurrentPage();
  const [selectedSortOption, setSelectedSortOption] = useState('Release Date');
  const [sortConfig, setSortConfig] = useState({
    sortBy: localStorage.getItem('sortBy') || 'popularity.desc',
  });

  const handleSortByRating = () => {
    setSortConfig((prevConfig) => ({
      ...prevConfig,
      sortBy: 'vote_average.desc',
    }));
    setCurrentPage(1);
  };

  const handleSortByDateAscending = () => {
    setSortConfig((prevConfig) => ({
      ...prevConfig,
      sortBy:
        selectedSortOption === 'release_date.asc'
          ? 'release_date.asc'
          : 'first_air_date.asc',
    }));
    setCurrentPage(1);
  };

  const handleSortByDateDescending = () => {
    setSortConfig((prevConfig) => ({
      ...prevConfig,
      sortBy:
        selectedSortOption === 'release_date.desc'
          ? 'release_date.desc'
          : 'first_air_date.desc',
    }));
    setCurrentPage(1);
  };

  return (
    <FilterAndSortContext.Provider
      value={{
        selectedMovieGenre,
        setSelectedMovieGenre,
        selectedTvShowGenre,
        setSelectedTvShowGenre,
        selectedSortOption,
        setSelectedSortOption,
        sortConfig,
        setSortConfig,
        handleSortByDateAscending,
        handleSortByDateDescending,
        handleSortByRating,
      }}
    >
      {children}
    </FilterAndSortContext.Provider>
  );
};

export const useFilterAndSort = () => useContext(FilterAndSortContext);
