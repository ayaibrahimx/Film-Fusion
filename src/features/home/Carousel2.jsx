import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePoster } from './posterSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Spinner from '../../ui/Spinner';

// Custom arrow components
const CarouselNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        right: '1rem',
        color: 'blue !important',
      }}
      onClick={onClick}
    >
      <BsArrowRight />
    </div>
  );
};

const CarouselPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        left: '1rem',
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <BsArrowLeft />
    </div>
  );
};

function Carousel_2({ movies, setSelectedMovie }) {
  const [sliderRef, setSliderRef] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const firstMovie = movies[0];
    // Dispatch the changePoster action when movies state changes
    if (movies.length > 0) {
      dispatch(
        changePoster({
          url: `https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`,
          name: firstMovie.title,
          description: firstMovie.overview,
          imdbRating: firstMovie.vote_average.toFixed(1),
          runtime: firstMovie.runtime,
          movieId: firstMovie.id,
        }),
      );
    }
  }, [dispatch, movies]);

  const handleOnClick = (movie) => {
    const imgUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    dispatch(
      changePoster({
        url: imgUrl,
        name: movie.title,
        description: movie.overview,
        imdbRating: movie.vote_average.toFixed(1),
        runtime: movie.runtime,
      }),
    );
  };

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <CarouselNextArrow />,
    prevArrow: <CarouselPrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container   fixed bottom-0 right-0 h-64 w-[60%] max-xl:left-[1.5rem] max-xl:top-72 max-xl:w-[100%] max-lg:left-2  max-lg:top-72 max-lg:w-[100%] max-md:left-3  max-md:mt-20 max-sm:left-[-5%]  max-sm:top-[14rem]  max-sm:m-auto ">
      <div
        onClick={sliderRef?.slickPrev}
        className=" absolute bottom-[40%] z-10 transform cursor-pointer rounded-full bg-black bg-opacity-50 px-4 py-4 text-white brightness-150 hover:bg-opacity-100 max-xl:bottom-[-10%] max-[1025px]:bottom-[20%]  max-lg:bottom-[15%] max-md:bottom-[10%] max-md:left-[-3%] max-sm:bottom-[50%] max-sm:left-[7%] "
      >
        <BsArrowLeft />
      </div>
      <Slider {...settings} ref={setSliderRef}>
        {movies.map((movie, index) => (
          <div key={index}>
            <div
              className="carousel-slide flex-shrink-0"
              onClick={() => setSelectedMovie(movie)}
            >
              <Suspense fallback={<Spinner />}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.Title}
                  className="carousel-image  z-0 h-64 w-60 cursor-pointer rounded-xl pb-2  opacity-70  hover:opacity-100 max-xl:mt-14 max-xl:h-96 max-xl:w-72 max-[1025px]:h-60 max-[1025px]:w-72 max-lg:w-64 max-md:ml-9 max-sm:m-auto max-sm:h-48 max-sm:w-48 "
                  style={{
                    transition: 'filter 0.9s ', // Smooth transition for filter changes
                  }}
                  onClick={() => handleOnClick(movie)}
                />
              </Suspense>
            </div>
          </div>
        ))}
      </Slider>
      <div
        onClick={sliderRef?.slickNext}
        className="
        absolute  bottom-[40%] right-16 z-10 mr-1 transform cursor-pointer overflow-hidden rounded-full bg-black bg-opacity-50 px-4 py-4 text-white 
        hover:bg-opacity-100 
        max-xl:bottom-[-10%] 
        max-xl:right-[3rem] 
        max-[1025px]:bottom-[20%]  
        max-lg:bottom-[15%] 
      max-lg:right-[0.75rem]
        max-md:bottom-[10%]
        max-sm:bottom-[50%] 
        max-sm:right-[6%]
        "
      >
        <BsArrowRight />
      </div>
    </div>
  );
}

export default Carousel_2;
