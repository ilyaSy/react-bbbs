import './button.css';
import PropTypes from 'prop-types';

const Button = ({ children, className }) => (
  <button className={className} type="button">
    {children}
  </button>
);
//  type: PropTypes.string.isRequired,

Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
export default Button;
