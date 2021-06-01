import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tag from '../Tag/Tag';
import './Movie.css';

const Movie = ({ type, tags, title, info, imageUrl, link }) => {
  let tagsText;
  if (tags) tagsText = tags.map((tag) => tag.name);
  return (
    <li className="movie">
      <Link to="/*" className="mainlink" />
      <div className="movie__img">
        <img className="movie__poster" src={imageUrl} alt="" />
        <div className="movie__tags">
          {type === 'movie' &&
            tagsText.map((tagText) => (
              <Tag tagText={tagText} key={`${tagText}_${Math.random()}`} />
            ))}
        </div>
      </div>
      <div className="movie__descriprion">
        <div className="movie__name">
          <h3 className="movie__title">{title}</h3>
          <p className="movie__caption">{info}</p>
        </div>
        <a className="movie__link" href={link} target="_blank" rel="noopener noreferrer">
          {`смотреть ${type === 'movie' ? 'трейлер' : 'видео'}`}
        </a>
      </div>
    </li>
  );
};

// TO DO:
// * главная, видео и фильмы

Movie.propTypes = {
  type: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any),
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

Movie.defaultProps = {
  tags: [],
};

export default Movie;
