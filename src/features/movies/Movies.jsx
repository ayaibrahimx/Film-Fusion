import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import useMovies from './useMovies';
import Spinner from '../../ui/Spinner';
import FilterAndSort from '../../ui/FilterAndSort';

import { IoFilter } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';

import CloseOutsideModal from '../../ui/CloseOutsideModal';
import { Suspense } from 'react';
import Pagination from '../../ui/Pagination';
import AddingToFavorites from '../../ui/AddingToFavorites';

function Movies() {
  const [showFilterAndSort, setShowFilterAndSort] = useState(false);
  const {
    movies,
    isLoading,
    error,

    currentPage,
    totalPages,
  } = useMovies();
  useEffect(() => {
    // Render the movie list based on movies state
  }, [movies]);

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      // If there are already movies stored in local storage, don't overwrite them
      return;
    }
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {showFilterAndSort ? (
        <IoClose // Close icon when filter is shown
          className="ml-11 mt-3 h-6 w-6 cursor-pointer font-bold text-[#e50914] "
          onClick={() => {
            setShowFilterAndSort(!showFilterAndSort);
          }}
        />
      ) : (
        <IoFilter // Filter icon when filter is not shown
          className="ml-11 mt-3 h-6 w-6 cursor-pointer font-bold text-gray-100"
          onClick={() => {
            setShowFilterAndSort(!showFilterAndSort);
          }}
        />
      )}

      <div
        className={`mx-0   flex flex-wrap justify-center max-lg:mb-7   max-sm:mb-7 max-sm:h-dvh`}
      >
        <Toaster />
        {movies.length === 0 ? (
          <p className="my-auto text-center text-4xl text-slate-100">
            No movies are found 😔
          </p>
        ) : (
          <>
            {movies.map((movie, i) => (
              <div
                key={i}
                className={`group relative mx-2 mb-4 h-72  ${showFilterAndSort ? 'opacity-40' : ''} overflow-hidden `}
              >
                <AddingToFavorites item={movie} type="movies" />
                <Suspense fallback={<Spinner />}>
                  <Link to={`/movies/${movie.id}?page=${currentPage}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="pic"
                      className="h-72 w-64 cursor-pointer rounded-sm object-cover max-xl:w-56 max-lg:w-40"
                    />
                  </Link>
                </Suspense>
                <h1 className="absolute bottom-0 left-0 right-0 mt-2 bg-black bg-opacity-50 px-2 py-1 text-center text-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {movie.title}
                </h1>
              </div>
            ))}
            <Pagination totalPages={totalPages} />
          </>
        )}
      </div>

      <CloseOutsideModal onClose={() => setShowFilterAndSort(false)}>
        <div
          className={`absolute top-24  ${movies.length === 18 ? 'h-[128%]' : 'h-fit'} w-96  overflow-y-auto  rounded-md bg-stone-900  bg-opacity-70 text-center transition-all duration-700 ${showFilterAndSort ? 'left-0' : '-left-96'}`}
        >
          {showFilterAndSort && <FilterAndSort />}
        </div>
      </CloseOutsideModal>
    </>
  );
}

export default Movies;
