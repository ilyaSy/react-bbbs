import PropTypes from 'prop-types';
import './popup.css';

const Popup = ({ popupType, isOpen, children }) => (
  <div className={`popup ${popupType} ${isOpen ? 'popup_opened' : ''}`}>{children}</div>
);

Popup.propTypes = {
  popupType: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
Popup.defaultProps = {
  popupType: '',
  isOpen: false,
};
export default Popup;
