import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import CloseButton from './CloseButton';
import CloseOutsideModal from './CloseOutsideModal';

function TrailerModal({ item, onClose, getTrailer }) {
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const url = await getTrailer(item);
        setTrailerUrl(url);
      } catch (error) {
        console.error('Error fetching trailer:', error);
        setTrailerUrl(''); // Set trailer URL to empty if there's an error
      }
    };

    fetchTrailer();
  }, [item, getTrailer]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[80%] w-[80%] rounded-lg bg-white">
          <button className="absolute -right-3 top-0 z-10 m-4 h-5 w-5 text-gray-200">
            <CloseButton handleClose={onClose} />
          </button>

          {trailerUrl ? (
            <CloseOutsideModal onClose={onClose}>
              <iframe
                src={trailerUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
              ></iframe>
            </CloseOutsideModal>
          ) : (
            <CloseOutsideModal onClose={onClose}>
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                <Spinner />
              </div>
            </CloseOutsideModal>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
