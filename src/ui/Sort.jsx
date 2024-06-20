import { useFilterAndSort } from '../context/FilterAndSortContext';

function Sort() {
  const {
    sortConfig,
    setSortConfig,
    handleSortByDateAscending,
    handleSortByDateDescending,
    handleSortByRating,
  } = useFilterAndSort();

  const getSortingButtonClassName = (option) => {
    return `rounded-md border-2 border-solid border-slate-200 p-2 text-sm font-bold hover:bg-gray-100 hover:bg-opacity-50 hover:text-[#e50914] ${sortConfig.sortBy === option ? 'text-[#e50914]' : ''}`;
  };
  const handleSortButtonClicked = (option) => {
    if (sortConfig.sortBy === option) {
      // Reset sorting configuration to default state
      setSortConfig('popularity.desc');
      console.log(option, 'option');
    }
  };
  return (
    <>
      <p className="font-truculenta font-extrabold text-slate-100">Order By</p>

      <span className="mt-4 flex justify-between text-slate-100">
        <button
          className={getSortingButtonClassName('vote_average.desc')}
          onClick={() => {
            handleSortByRating();
            handleSortButtonClicked('vote_average.desc');
          }}
        >
          Top Rated
        </button>
        <button
          className={getSortingButtonClassName(
            'first_air_date.asc' || 'release_date.asc',
          )}
          onClick={() => {
            handleSortByDateAscending();
            handleSortButtonClicked('first_air_date.asc' || 'release_date.asc');
          }}
        >
          Date Old to New
        </button>
        <button
          className={getSortingButtonClassName(
            'first_air_date.desc' || 'release_date.desc',
          )}
          onClick={() => {
            handleSortByDateDescending();
            handleSortButtonClicked(
              'first_air_date.desc' || 'release_date.desc',
            );
          }}
        >
          Date New to Old
        </button>
      </span>
    </>
  );
}

export default Sort;
