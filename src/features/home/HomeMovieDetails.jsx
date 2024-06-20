import MovieButtons from '../../ui/MovieButtons';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import TrailerModal from '../../ui/TrailerModal';

function MovieDetails({ selectedMovie, movies }) {
  const [watchTrailerClicked, setWatchTrailerClicked] = useState(false);

  const { name, description, imdbRating } = useSelector(
    (store) => store.poster,
  );

  return (
    <>
      <div className="relative mx-2 ml-12 mt-16 w-[40%] items-center justify-between rounded-lg bg-neutral-950 bg-opacity-50 px-6 py-5 text-slate-300 brightness-125 transition-all duration-500 max-xl:m-auto  max-xl:mt-12 max-xl:block max-xl:h-auto  max-xl:w-[80%]  max-md:ml-0 max-md:mt-3 max-md:block max-md:h-auto max-md:w-[90%]  max-sm:w-full max-sm:px-4 max-sm:py-3 xl:w-[60%]">
        <h2 className="pb-5 text-4xl font-extrabold uppercase text-[#e50914] max-md:text-3xl max-sm:text-2xl">
          {name}
        </h2>
        <p className=" mb-1 w-[35rem] font-bold leading-8 text-gray-200 opacity-70 max-xl:w-96 max-[1025px]:w-full max-[1025px]:text-sm max-md:w-fit max-sm:w-full max-sm:text-xs xl:w-[45rem] xl:text-lg">
          {description}
        </p>
        <h3 className="text-md mt-3 leading-8 text-gray-200 max-md:mb-7 max-sm:text-sm">
          IMDB Rating: {imdbRating}⭐
        </h3>

        <MovieButtons
          className="absolute bottom-5 right-[3.5rem] z-10 float-end flex justify-center font-bold text-gray-200 max-md:bottom-0 max-md:right-2 max-md:mb-2 max-md:mt-3 max-sm:left-2 max-sm:mt-5 "
          closeModal={() => setWatchTrailerClicked(true)}
          movie={selectedMovie}
        />
      </div>
      {watchTrailerClicked && (
        <TrailerModal
          onClose={() => setWatchTrailerClicked(false)}
          movieId={selectedMovie.id || (movies.length > 0 && movies[0].id)}
        />
      )}
    </>
  );
}

export default MovieDetails;
