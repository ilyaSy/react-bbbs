import './button.css';
import PropTypes from 'prop-types';

const Button = ({ children, className, onClick }) => (
  <button className={className} type="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: '',
  onClick: () => {},
};

export default Button;
