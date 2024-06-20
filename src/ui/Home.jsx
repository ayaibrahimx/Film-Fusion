import React, { Suspense, useEffect, useState } from 'react';

import MovieDetails from '../features/home/HomeMovieDetails';
import useMovies from '../features/movies/useMovies';
import Spinner from './Spinner';

const Carousel2 = React.lazy(() => import('../features/home/Carousel2'));
function Home() {
  const { movies } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState('');
  useEffect(() => {
    if (movies && movies.length > 0) {
      setSelectedMovie(movies[0]);
    }
  }, [movies]);

  return (
    <>
      <span className="overflow-hidden font-lato ">
        <MovieDetails movies={movies} selectedMovie={selectedMovie} />

        <Suspense fallback={<Spinner />}>
          <Carousel2
            movies={movies}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        </Suspense>
      </span>
    </>
  );
}

export default Home;
