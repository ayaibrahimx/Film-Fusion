import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import React from 'react';

function PageButtons({
  handleNextPage,
  currentPage,
  totalPages,
  handlePrevPage,
}) {
  return (
    <span className=" mx-auto  mb-2 flex h-12 w-60 justify-center  ">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="my-auto rounded-full bg-black bg-opacity-50 px-4 py-4 text-[#e50914] hover:bg-opacity-100"
      >
        <BsArrowLeft />
      </button>
      <div className="my-auto w-full text-center text-slate-100">
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="my-auto rounded-full bg-black bg-opacity-50 px-4 py-4 text-[#e50914] hover:bg-opacity-100"
      >
        <BsArrowRight />
      </button>
    </span>
  );
}

export default PageButtons;
