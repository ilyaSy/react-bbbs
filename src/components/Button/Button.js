import './button.css';
import PropTypes from 'prop-types';

const Button = ({ children, className, type }) => (
  <button className={className} type={type}>
    {children}
  </button>
);

Button.PropTypes = {
  children: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default Button;
