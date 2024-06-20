import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../../ui/Spinner';
import TrailerModal from '../../ui/TrailerModal';
import MovieButtons from '../../ui/MovieButtons';
import useMovieDetails from './useMovieDetails';
import useMovies from './useMovies';

function Movie() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false); // State to control the visibility of the trailer modal

  useMovieDetails({ movieId, setMovieDetails });
  const { getTrailer } = useMovies();

  if (!movieDetails) {
    return <Spinner />;
  }

  const releaseYear = new Date(movieDetails.release_date).getFullYear();

  return (
    <>
      <div className="relative">
        <div
          className="h-dvh"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
            filter: 'blur(10px)',
          }}
        ></div>
        <div className="absolute inset-0 m-auto flex max-h-fit w-fit flex-col gap-10 rounded-md bg-stone-900 bg-opacity-50 px-6 pb-14 max-sm:h-full md:flex-row md:px-2">
          <div className="mt-3 flex max-h-fit flex-col">
            <h1 className="text-4xl font-extrabold text-[#e50914] max-sm:text-2xl">
              {movieDetails.title}
            </h1>
            <div className="mt-3 flex justify-center md:hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt="poster"
                className="h-96 rounded object-cover max-sm:h-52"
              />
            </div>
            <p className="mt-2 w-[32rem] text-lg text-slate-100  max-md:w-72 max-sm:text-sm">
              {movieDetails.overview}
            </p>
            <div className="mt-4 text-slate-100 max-sm:text-xs">
              <h2 className="text-md font-semibold">
                Duration: {movieDetails.runtime}m ⌛
              </h2>
              <h2 className="text-md font-semibold">
                IMDB Rating: {movieDetails.vote_average.toFixed(1)}⭐
              </h2>
              <h2 className="text-md font-semibold">Released: {releaseYear}</h2>
              <h2 className="text-md font-semibold">Genres:</h2>
              <ul className="mt-3 flex flex-wrap">
                {movieDetails.genres.map((genre, index) => (
                  <li
                    key={index}
                    className="mb-2 mr-2 rounded bg-neutral-950 px-2 py-1"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-3 hidden justify-center md:flex">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt="poster"
              className="h-96 rounded object-cover"
            />
          </div>
          <MovieButtons
            movie={movieDetails}
            closeModal={setShowTrailerModal}
            className="max- absolute bottom-0 left-0 right-0 flex justify-center space-x-3 pb-6 font-bold text-gray-200"
            type="movies"
          />
        </div>
      </div>
      {showTrailerModal && (
        <TrailerModal
          item={movieId}
          onClose={() => setShowTrailerModal(false)}
          getTrailer={getTrailer} // Pass the getTrailer function to the TrailerModal
        />
      )}
    </>
  );
}

export default Movie;
