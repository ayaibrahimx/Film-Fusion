import { useEffect, useRef } from 'react';

function CloseOutsideModal({ onClose, children }) {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  return <span ref={modalRef}>{children}</span>;
}

export default CloseOutsideModal;
