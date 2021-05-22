import PropTypes from 'prop-types';
import Movie from '../Movie/Movie';
import './MoviesContainer.css';

function MoviesContainer({ movies }) {
  return (
    <ul className="movies">
      {movies.map(({ tags, title, info, imageUrl, link }) => (
        <Movie
          tags={tags}
          title={title}
          info={info}
          imageUrl={imageUrl}
          link={link}
          key={`${Math.random()}_${title}`}
        />
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
