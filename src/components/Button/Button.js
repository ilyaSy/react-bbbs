import './button.css';
import PropTypes from 'prop-types';

const Button = ({ children, className, onClick, type }) => (
  <button className={className} type={type === 'submit' ? 'submit' : 'button'} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  children: '',
  onClick: () => {},
};

export default Button;
