import { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './popup.css';

const Popup = ({ popupType, isOpen, onClose, children }) => {
  const popupRef = createRef(null);
  const handleOverlayClick = (event) => {
    if (popupRef.current === event.target) {
      onClose();
    }
  };
  const handleEscClick = (event) => {
    if (event.key === 'Escape') onClose();
  };
  useEffect(() => {
    document.addEventListener('keydown', handleEscClick);
    return () => {
      document.removeEventListener('keydown', handleEscClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup ${popupType} ${isOpen ? 'popup_opened' : ''}`}
      role="presentation"
      ref={popupRef}
      onMouseDown={handleOverlayClick}
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
