import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function MovieCard({ movie, handleAddToList }) {
  const { selected } = useSelector((store) => store.movie);

  const handleAddToListClick = () => {
    handleAddToList(movie);
  };

  return (
    <div className="group relative mx-2 mb-8">
      <span onClick={handleAddToListClick}>
        <FaHeart
          className={`absolute right-2 top-2 h-5 w-5 cursor-pointer rounded-lg bg-black bg-opacity-50 ${
            selected ? 'text-[#e50914]' : 'text-slate-100'
          }`}
        />
      </span>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="pic"
        className="h-72 w-56 cursor-pointer rounded-sm object-cover"
      />
      <h1 className="absolute bottom-0 left-0 right-0 mt-2 bg-black bg-opacity-50 px-2 py-1 text-center text-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {movie.title}
      </h1>
    </div>
  );
}

export default MovieCard;
