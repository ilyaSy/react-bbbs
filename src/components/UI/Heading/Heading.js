import PropTypes from 'prop-types';
import './heading.css';

const Heading = ({ children }) => <h1 className="heading">{children}</h1>;
Heading.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Heading;
