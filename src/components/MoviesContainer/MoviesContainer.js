import PropTypes from 'prop-types';
import Movie from '../Movie/Movie';
import './MoviesContainer.css';

function MoviesContainer({ movies }) {
  return (
    <ul className="movies">
      {movies.map(({ title, ...args }) => (
        <Movie type="movie" key={`${Math.random()}_${title}`} {...args} />
      ))}
    </ul>
  );
}

MoviesContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.any),
};

MoviesContainer.defaultProps = {
  movies: [],
};

export default MoviesContainer;
