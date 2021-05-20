import PropTypes from 'prop-types';
import './MoviesContainer.css';

const MoviesContainer = ({ children }) => <ul className="movies">{children}</ul>;

MoviesContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MoviesContainer;
