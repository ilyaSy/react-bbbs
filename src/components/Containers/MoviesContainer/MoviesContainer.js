import PropTypes from 'prop-types';
import VideoCard from '../../Cards/VideoCard/VideoCard';
import './MoviesContainer.css';

function MoviesContainer({ movies, handleVideoClick, isMovesPage }) {
  return (
    <ul className="movies">
      {movies.map(({ id: key, ...props }) => (
        <VideoCard
          type="movie"
          isMovesPage={isMovesPage}
          handleVideoClick={handleVideoClick}
          key={key}
          {...props}
        />
      ))}
    </ul>
  );
}

MoviesContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.any),
  handleVideoClick: PropTypes.func,
  isMovesPage: PropTypes.bool,
};

MoviesContainer.defaultProps = {
  movies: [],
  handleVideoClick: () => {},
  isMovesPage: false,
};

export default MoviesContainer;
