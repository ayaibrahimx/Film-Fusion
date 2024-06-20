import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import { RxHamburgerMenu } from 'react-icons/rx';
import CloseOutsideModal from './CloseOutsideModal';
import { useCurrentPage } from '../context/CurrentPageContext';

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchedMovie, setSearchedMovie] = useState('');
  const [showMoviesModal, setShowMoviesModal] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const { setCurrentPage } = useCurrentPage();

  const location = useLocation();

  const handleClickOnSearch = () => {
    setIsVisible(!isVisible);
  };

  const handleSearch = (e) => {
    setSearchedMovie(e.target.value);
    setIsVisible(true);
    setShowMoviesModal(true);
  };

  const handleOnClick = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  const closeMenu = () => {
    setIsMenuClicked(false);
  };

  return (
    <nav className="relative flex items-center bg-neutral-950 bg-opacity-70 px-6 py-4 font-oswald text-slate-100 active:text-[#e50914] ">
      <Link to="/">
        <div className="mx-8 flex cursor-pointer items-center gap-3">
          <h1 className="max-sm:lg text-2xl font-semibold uppercase tracking-widest text-white">
            Film <span className="text-[#e50914]">Fusion</span>
          </h1>
        </div>
      </Link>

      <div className="relative ml-auto flex gap-4 duration-700">
        <div
          className={`ml-9 flex cursor-pointer gap-8 text-lg duration-700 max-md:hidden`}
        >
          <Link to="/">
            <h2
              className={`hover:text-[#e50914] hover:opacity-100 ${
                location.pathname === '/' ? 'text-[#e50914]' : ''
              }`}
            >
              Home
            </h2>
          </Link>
          <Link to="/movies">
            <h2
              className={`hover:text-[#e50914] hover:opacity-100 ${
                location.pathname === '/movies' ? 'text-[#e50914]' : ''
              }`}
              onClick={() => setCurrentPage(1)}
            >
              Movies
            </h2>
          </Link>
          <Link to="/tvshows">
            <h2
              className={`hover:text-[#e50914] max-lg:w-16 ${
                location.pathname === '/tvshows' ? 'text-[#e50914]' : ''
              }`}
              onClick={() => setCurrentPage(1)}
            >
              Tv Shows
            </h2>
          </Link>
          <Link to="/myList">
            <h2
              className={`hover:text-[#e50914] max-lg:w-16 ${
                location.pathname === '/myList' ? 'text-[#e50914]' : ''
              }`}
              onClick={() => setCurrentPage(1)}
            >
              My List
            </h2>
          </Link>
          <div className={`group flex transition-all duration-700`}>
            <FaSearch
              className="my-auto cursor-pointer hover:text-[#e50914]"
              onClick={handleClickOnSearch}
            />
            <input
              type="text"
              placeholder="Search..."
              className={`border-none bg-transparent outline-none ${
                isVisible ? 'block w-56 pl-4 pr-8' : 'hidden pl-0 pr-0'
              } transition-all duration-700`}
              style={{ minWidth: !isVisible ? '10rem' : '0' }}
              onChange={handleSearch}
              value={searchedMovie}
            />
          </div>
        </div>
        <div>
          <RxHamburgerMenu
            className="relative ml-auto hidden h-5 w-5 cursor-pointer hover:text-[#e50914] max-md:block"
            onClick={handleOnClick}
          />
        </div>
      </div>
      {isMenuClicked && (
        <CloseOutsideModal onClose={closeMenu}>
          <div className="absolute left-0 right-0 top-14 flex-col gap-4 bg-neutral-950 bg-opacity-50 px-6 py-4 font-oswald text-lg text-slate-100 max-md:z-10 max-md:flex md:hidden">
            <Link to="/" onClick={closeMenu}>
              <h2
                className={`hover:text-[#e50914] hover:opacity-100 ${
                  location.pathname === '/' ? 'text-[#e50914]' : ''
                }`}
              >
                Home
              </h2>
            </Link>
            <Link to="/movies" onClick={closeMenu}>
              <h2
                className={`hover:text-[#e50914] hover:opacity-100 ${
                  location.pathname === '/movies' ? 'text-[#e50914]' : ''
                }`}
              >
                Movies
              </h2>
            </Link>
            <Link to="/tvshows" onClick={closeMenu}>
              <h2
                className={`hover:text-[#e50914] ${
                  location.pathname === '/tvshows' ? 'text-[#e50914]' : ''
                }`}
              >
                Tv Shows
              </h2>
            </Link>
            <Link to="/myList" onClick={closeMenu}>
              <h2
                className={`hover:text-[#e50914] ${
                  location.pathname === '/myList' ? 'text-[#e50914]' : ''
                }`}
              >
                My List
              </h2>
            </Link>

            <input
              type="text"
              placeholder="Search..."
              className={`block w-56 border-none 
              bg-transparent  pr-8 outline-none 
           `}
              onChange={handleSearch}
              value={searchedMovie}
            />
          </div>{' '}
        </CloseOutsideModal>
      )}
      {showMoviesModal && searchedMovie && (
        <Search
          searchedMovie={searchedMovie}
          setShowMovies={setShowMoviesModal}
          setSearchedMovie={setSearchedMovie}
        />
      )}
    </nav>
  );
}

export default Header;
