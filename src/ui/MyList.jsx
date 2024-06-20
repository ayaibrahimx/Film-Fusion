import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CloseButton from './CloseButton';
import Pagination from './Pagination';
import { useCurrentPage } from '../context/CurrentPageContext';
import { removeFromList } from '../features/mediaSlice';
import { useEffect } from 'react';

function MyList() {
  const { movies, tvShows } = useSelector((store) => store.media);
  const dispatch = useDispatch();
  const { currentPage, setCurrentPage } = useCurrentPage();

  const handleRemoveFromList = (item) => {
    dispatch(removeFromList({ item, type: item.title ? 'movies' : 'tvShows' }));
  };

  const itemsPerPage = 12;
  const combinedList = [...movies, ...tvShows]; // Combine movies and TV shows
  const totalPages = Math.ceil(combinedList.length / itemsPerPage);
  const displayedItems = combinedList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (displayedItems.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [displayedItems.length, currentPage, setCurrentPage]);

  return (
    <div className="flex h-screen flex-col items-center bg-stone-900 py-3 pb-12 font-lato text-white">
      {combinedList.length === 0 ? (
        <h1 className="m-auto text-center text-4xl">Your list is empty! 😔</h1>
      ) : (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedItems.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span className="group relative">
                  <Link
                    to={`/myList/${item.title ? 'movie' : 'tvShow'}/${item.id}`}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.name}
                      className="m-auto mt-2 h-80 w-64 rounded-md object-cover pt-3 transition-transform duration-300"
                    />
                  </Link>
                  <CloseButton
                    handleClose={() => handleRemoveFromList(item)}
                    movie={item}
                    className="absolute right-14 top-4 hidden max-lg:block max-sm:block"
                  />
                </span>
                <div className="p-4">
                  <h2 className="mb-2 text-center text-xl font-semibold text-[#e50914]">
                    {item.title || item.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

export default MyList;
