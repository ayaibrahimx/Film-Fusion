import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Applayout from './ui/Applayout';
import Error from './ui/Error';
import Home from './ui/Home';
import Movies from './features/movies/Movies';
import MyList from './ui/MyList';
import Movie from './features/movies/Movie';
import TvShows from './features/tvShows/TvShows';
import TvShow from './features/tvShows/TvShow';
import { CurrentPageProvider } from './context/CurrentPageContext';
import { FilterAndSortProvider } from './context/FilterAndSortContext';

const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Error />, // Changed from 'error' to 'errorElement'
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
      {
        path: '/myList',
        element: <MyList />,
      },
      {
        path: '/movies/:movieId',
        element: <Movie />,
      },
      {
        path: '/tvshows',
        element: <TvShows />,
      },
      {
        path: '/tvshows/:tvShowId',
        element: <TvShow />,
      },
      {
        path: '/myList/movie/:movieId', // Separate routes for movie and TV show
        element: <Movie />,
      },
      {
        path: '/myList/tvShow/:tvShowId', // Separate routes for movie and TV show
        element: <TvShow />,
      },
    ],
  },
]);

function App() {
  return (
    <CurrentPageProvider>
      <FilterAndSortProvider>
        <RouterProvider router={router} />
      </FilterAndSortProvider>
    </CurrentPageProvider>
  );
}

export default App;
