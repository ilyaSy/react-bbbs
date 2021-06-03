import { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './popup.css';

const Popup = ({ popupType, onClose, children }) => {
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
  }, [onClose]);

  return (
    <div
      className={`popup ${popupType}`}
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
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Popup.defaultProps = {
  popupType: '',
  onClose: () => {},
};

export default Popup;
