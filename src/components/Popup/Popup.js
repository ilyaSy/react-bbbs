import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './popup.css';

const Popup = ({ popupType, isOpen, onClose, children }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && isOpen) onClose();
  };

  useEffect(() => {
    const handleEscClick = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscClick);

    return () => {
      document.removeEventListener('keydown', handleEscClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup ${popupType} ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      {children}
    </div>
  );
};

Popup.propTypes = {
  popupType: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Popup.defaultProps = {
  popupType: '',
  isOpen: false,
  onClose: () => {},
};

export default Popup;
