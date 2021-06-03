import PropTypes from 'prop-types';
import VideoCard from '../../Cards/VideoCard/VideoCard';
import './MoviesContainer.css';

function MoviesContainer({ movies }) {
  return (
    <ul className="movies">
      {movies.map(({ id: key, ...props }) => (
        <VideoCard type="movie" key={key} {...props} />
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
