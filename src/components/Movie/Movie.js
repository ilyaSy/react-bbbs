import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import Tag from '../Tag/Tag';
import './Movie.css';

const Movie = ({ tags, title, caption, poster, link }) => (
  <li className="movie">
    <Link to="/" className="mainlink" />
    <div className="movie__img">
      <img className="movie__poster" src={poster} alt="" />
      <div className="movie__tags">
        {tags.map((tagText) => (
          <Tag tagText={tagText} />
        ))}
      </div>
    </div>
    <div className="movie__descriprion">
      <div className="movie__name">
        <h3 className="movie__title">{title}</h3>
        <p className="movie__caption">{caption}</p>
      </div>
      <a className="movie__link" href={link} target="_blank" rel="noopener noreferrer">
        смотреть трейлер
      </a>
    </div>
  </li>
);

// TO DO:
// * надо понять, постер там будет или ссылка на трейлер
// * решить, нужна ли кликабельность; если да, куда ведёт роут
// * главная, видео и фильмы

Movie.propTypes = {
  tags: PropTypes.arrayOf(string).isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Movie;
