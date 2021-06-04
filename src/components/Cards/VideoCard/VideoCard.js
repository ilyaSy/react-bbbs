import PropTypes from 'prop-types';
import Tag from '../../UI/Tag/Tag';
import './VideoCard.css';
import Button from '../../UI/Button/Button';

const VideoCard = ({ type, tags, title, info, link, handleVideoClick }) => {
  let tagsText;
  if (tags) tagsText = tags.map((tag) => tag.name);
  const clickHandler = () => {
    handleVideoClick(link);
  };

  const youtubeParser = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };
  const embedId = youtubeParser(link);

  return (
    <Button className="movie movie__card" onClick={clickHandler}>
      <div className="movie__img">
        <img
          className="movie__poster"
          src={`http://img.youtube.com/vi/${embedId}/0.jpg`}
          alt={title}
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
        <a className="movie__link" href={link} target="_blank" rel="noopener noreferrer">
          {`смотреть ${type === 'movie' ? 'трейлер' : 'видео'}`}
        </a>
      </div>
    </Button>
  );
};

// TO DO:
// * тз: "кликнуть на нужном блоке "Смотреть трейлер" и после нажатия откроется поп-ап
//   с полноформатной версией видео, также видео можно посмотреть, кликнув на его превью"
//   ПРЕВЬЮ

VideoCard.propTypes = {
  type: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any),
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  handleVideoClick: PropTypes.func,
};

VideoCard.defaultProps = {
  tags: [],
  handleVideoClick: () => {},
};

export default VideoCard;
