import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tag from '../../UI/Tag/Tag';
import youtubeLinkParser from '../../../utils/youtubeLinkParser';
import './VideoCard.css';

const VideoCard = ({ type, tags, title, info, link, handleVideoClick, isMovesPage }) => {
  let tagsText;
  if (tags) tagsText = tags.map((tag) => tag.name);

  const clickHandler = () => {
    handleVideoClick(link, title, info);
  };

  const embedId = youtubeLinkParser(link);

  return (
    <li className="movie movie__card">
      {!isMovesPage ? (
        <Link
          className="mainlink"
          to="/read-watch/movies"
          rel="noopener noreferrer"
          onClick={clickHandler}
        />
      ) : null}
      <div className="movie__img">
        <img
          className="movie__poster"
          src={`http://img.youtube.com/vi/${embedId}/0.jpg`}
          alt={title}
          onClick={clickHandler}
          aria-hidden="true"
        />
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
        <a
          className="movie__link"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={clickHandler}
        >
          {`смотреть ${type === 'movie' ? 'трейлер' : 'видео'}`}
        </a>
      </div>
    </li>
  );
};

VideoCard.propTypes = {
  type: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any),
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  handleVideoClick: PropTypes.func,
  isMovesPage: PropTypes.bool,
};

VideoCard.defaultProps = {
  tags: [],
  handleVideoClick: () => {},
  isMovesPage: true,
};

export default VideoCard;
