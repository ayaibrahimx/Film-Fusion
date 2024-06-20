import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useCurrentPage } from '../context/CurrentPageContext';

const Pagination = ({ totalPages }) => {
  const { currentPage, setCurrentPage } = useCurrentPage();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="m-auto mt-2 flex h-12 w-60 pb-3">
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
    </div>
  );
};

export default Pagination;
