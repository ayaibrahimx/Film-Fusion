import { FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToList,
  removeFromList,
  toggleFavorite,
} from '../features/mediaSlice';

function AddingToFavorites({ item, type }) {
  const dispatch = useDispatch();

  // Select the appropriate slice of state based on the type (movies or tvShows)
  const selectedItems = useSelector((state) => state.media[type]);
  console.log(selectedItems);

  const handleAddToList = (item) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      // If already selected, remove from list
      dispatch(removeFromList({ item, type }));
      toast.error(`${item.title || item.name} removed from favorites`, {
        style: { background: '#1C1917', color: '#F1F5F9' },
      });
    } else {
      // If not selected, add to list
      dispatch(addToList({ item, type }));
      toast.success(`${item.title || item.name} added to favorites`, {
        style: { background: '#1C1917', color: '#F1F5F9' },
      });
    }
  };

  const handleToggleFavorite = (item) => {
    dispatch(toggleFavorite({ item, type }));
  };

  return (
    <span
      onClick={() => handleAddToList(item)}
      className="absolute right-2 top-2 h-7 w-7 rounded-full bg-black bg-opacity-50"
    >
      <FaHeart
        onClick={() => handleToggleFavorite(item)}
        className={`absolute right-1 top-1 h-5 w-5 cursor-pointer ${
          selectedItems.find((i) => i.id === item.id)
            ? 'text-[#e50914]'
            : 'text-slate-100'
        }`}
      />
    </span>
  );
}

export default AddingToFavorites;
