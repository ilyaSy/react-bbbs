import './button.css';
import PropTypes from 'prop-types';

const Button = ({ children, className, onClick, type, disabled, id }) => (
  <button
    id={id}
    className={className}
    type={type === 'submit' ? 'submit' : 'button'}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Button.defaultProps = {
  type: 'button',
  children: '',
  disabled: '',
  onClick: () => {},
  id: null,
};

export default Button;
