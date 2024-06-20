import { IoClose } from 'react-icons/io5';

function CloseButton({ handleClose, movie, className }) {
  return (
    <span>
      <IoClose
        className={` h-5 w-5 rounded-full bg-black bg-opacity-50 hover:text-[#e50914] group-hover:inline ${className}`}
        onClick={() => handleClose(movie)}
      />
    </span>
  );
}

export default CloseButton;
