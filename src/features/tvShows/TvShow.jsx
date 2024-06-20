import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import TrailerModal from '../../ui/TrailerModal';
import MovieButtons from '../../ui/MovieButtons';
import useTvShowDetails from './useTvShowDetails';
import useTvShows from './useTvShows';

function TvShow() {
  const { tvShowId } = useParams();
  const [tvShowDetails, setTvShowDetails] = useState(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  useTvShowDetails({ setTvShowDetails, tvShowId });
  const { getTrailer } = useTvShows();

  if (!tvShowDetails) {
    return <Spinner />;
  }

  const releaseYear = new Date(tvShowDetails.first_air_date).getFullYear();

  return (
    <>
      <div className="relative">
        <div
          className="h-dvh"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShowDetails.backdrop_path})`,
            filter: 'blur(10px)',
          }}
        ></div>
        <div className="absolute inset-0 m-auto flex max-h-fit w-fit flex-col gap-10 rounded-md bg-stone-900 bg-opacity-50 px-6 pb-14 max-sm:h-full md:flex-row md:px-2">
          <div className="mt-3 flex max-h-fit flex-col">
            <h1 className="text-4xl font-extrabold text-[#e50914] max-sm:text-2xl">
              {tvShowDetails.name}
            </h1>
            <div className="mt-3 flex justify-center md:hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`}
                alt="poster"
                className="h-96 rounded object-cover max-sm:h-52"
              />
            </div>
            <p className="mt-2 w-[32rem] text-lg text-slate-100 max-md:w-72 max-sm:text-sm">
              {tvShowDetails.overview}
            </p>
            <div className="mt-4 text-slate-100 max-sm:text-xs">
              <h2 className="text-md font-semibold">
                Duration: {tvShowDetails.episode_run_time[0]}m ⌛
              </h2>
              <h2 className="text-md font-semibold">
                IMDB Rating: {tvShowDetails.vote_average.toFixed(1)}⭐
              </h2>
              <h2 className="text-md font-semibold">Released: {releaseYear}</h2>
              <h2 className="text-md font-semibold">Genres:</h2>
              <ul className="mt-3 flex flex-wrap">
                {tvShowDetails.genres.map((genre, index) => (
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
              src={`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`}
              alt="poster"
              className="h-96 rounded object-cover"
            />
          </div>
          <MovieButtons
            movie={tvShowDetails}
            closeModal={setShowTrailerModal}
            className="absolute bottom-0 left-0 right-0 flex justify-center space-x-3 pb-6 font-bold text-gray-200"
            type="tvShows"
          />
        </div>
      </div>
      {showTrailerModal && (
        <TrailerModal
          item={tvShowId}
          onClose={() => setShowTrailerModal(false)}
          getTrailer={getTrailer} // Pass the getTrailer function to the TrailerModal
        />
      )}
    </>
  );
}

export default TvShow;
