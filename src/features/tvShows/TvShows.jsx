import React, { Suspense, useEffect, useState } from 'react';
import useTvShows from './useTvShows';
import AddingToFavorites from '../../ui/AddingToFavorites';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { IoClose, IoFilter } from 'react-icons/io5';
import CloseOutsideModal from '../../ui/CloseOutsideModal';
import FilterAndSort from '../../ui/FilterAndSort';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';

const TvShows = () => {
  const { tvShows, error, totalPages, isLoading } = useTvShows();
  const [showFilterAndSort, setShowFilterAndSort] = useState(false);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {showFilterAndSort ? (
        <IoClose
          className="ml-11 mt-3 h-6 w-6 cursor-pointer font-bold text-[#e50914]"
          onClick={() => {
            setShowFilterAndSort(!showFilterAndSort);
          }}
        />
      ) : (
        <IoFilter
          className="ml-11 mt-3 h-6 w-6 cursor-pointer font-bold text-gray-100"
          onClick={() => {
            setShowFilterAndSort(!showFilterAndSort);
          }}
        />
      )}
      <div className="flex  flex-wrap justify-center">
        <Toaster />
        {tvShows.length === 0 ? (
          <p className="my-auto text-center text-4xl text-slate-100">
            No TV shows found 😔
          </p>
        ) : (
          <>
            {tvShows.map((show, index) => (
              <div
                key={index}
                className={`group relative mx-2 mb-4 h-72 ${showFilterAndSort ? 'opacity-40' : ''} overflow-hidden`}
              >
                <AddingToFavorites item={show} type="tvShows" />
                <Suspense fallback={<Spinner />}>
                  <Link to={`/tvshows/${show.id}`}>
                    <img
                      alt="pic"
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      className="h-72 w-64 cursor-pointer rounded-sm object-cover
                    max-xl:w-56 max-lg:w-40"
                    />
                  </Link>
                </Suspense>
                <h1 className="absolute bottom-0 left-0 right-0 mt-2 bg-black bg-opacity-50 px-2 py-1 text-center text-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg-[1025]:opacity-100 max-md:opacity-100 max-sm:opacity-100">
                  {show.name}
                </h1>
              </div>
            ))}
            <Pagination totalPages={totalPages} />
          </>
        )}
      </div>

      <CloseOutsideModal onClose={() => setShowFilterAndSort(false)}>
        <div
          className={`absolute top-24 ${tvShows.length === 20 ? 'h-[128%]' : 'h-fit'} w-96 overflow-y-auto rounded-md bg-stone-900 bg-opacity-70 text-center transition-all duration-700 ${showFilterAndSort ? 'left-0' : '-left-96'}`}
        >
          {showFilterAndSort && <FilterAndSort />}
        </div>
      </CloseOutsideModal>
    </>
  );
};

export default TvShows;
