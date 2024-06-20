import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePoster } from './posterSlice';

function Carousel({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);
  const dispatch = useDispatch();

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 3) % movies.length;
    console.log(newIndex);
    setCurrentIndex(newIndex >= movies.length + 1 ? 0 : newIndex);
    // const newIndex = currentIndex + 1;
    // setCurrentIndex(newIndex >= movies.length ? 0 : newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + movies.length) % movies.length;
    setCurrentIndex(newIndex < 0 ? movies.length - 1 : newIndex);
  };

  function handleOnClick(movie) {
    dispatch(
      changePoster({
        url: movie.Poster,
        name: movie.Title,
        description: movie.description,
        imdbRating: movie.imdbRating,
        runtime: movie.runtime,
      }),
    );
  }

  return (
    <div className="  absolute right-0 top-[27rem] h-64   max-w-[60%] flex-shrink cursor-pointer overflow-clip py-2">
      <div
        className="absolute top-1/2 z-10 -translate-y-1/2 transform rounded-full
        bg-black bg-opacity-50 px-4 py-4 text-white hover:bg-opacity-100"
        onClick={goToPrevSlide}
      >
        <BsArrowLeft className="cursor-pointer" />
      </div>

      <div
        className="flex transition-transform duration-500 "
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {[...movies].map((movie, index) => (
          <div key={index} className="mr-1 w-80 flex-shrink-0">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="h-[90%] w-[100%] rounded-xl opacity-70 hover:opacity-100"
              onClick={() => handleOnClick(movie)}
              style={{
                transition: 'filter 0.3s ', // Smooth transition for filter changes
              }}
            />

            <p className="mt-2 justify-center truncate text-center text-white">
              {movie.Title}
            </p>
          </div>
        ))}
      </div>
      <div
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2
        transform overflow-hidden rounded-full bg-black bg-opacity-50 px-4 py-4 text-white hover:bg-opacity-100"
        onClick={goToNextSlide}
      >
        <BsArrowRight className="cursor-pointer" />
      </div>
    </div>
  );
}

export default Carousel;
