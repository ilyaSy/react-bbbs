import './button.css';

const Button = ({ children, className, type }) => (
  <button className={className} type={type}>
    {children}
  </button>
);
export default Button;
