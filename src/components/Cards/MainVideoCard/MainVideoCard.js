import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import youtubeLinkParser from '../../../utils/youtubeLinkParser';
import './MainVideoCard.css';

const MainVideoCard = ({ video, handleVideoClick, isVideosPage }) => {
  const handleClick = () => {
    handleVideoClick(video.link, video.title, video.info);
  };

  const embedId = youtubeLinkParser(video.link);

  return (
    <div className="mainvideo">
      {!isVideosPage ? (
        <Link
          className="mainlink"
          to="/read-watch/videos"
          rel="noopener noreferrer"
          onClick={handleClick}
        />
      ) : null}
      <div className="mainvideo__description">
        <div className="mainvideo__name">
          <h3 className="mainvideo__title">{video.title}</h3>
          <p className="mainvideo__caption">{video.info}</p>
        </div>
        <a className="mainvideo__link" href={video.link}>
          смотреть видео
        </a>
      </div>
      <img
        src={`http://img.youtube.com/vi/${embedId}/0.jpg`}
        alt="видео отсутствует"
        className="mainvideo__video"
        onClick={handleClick}
        aria-hidden="true"
      />
    </div>
  );
};

MainVideoCard.propTypes = {
  video: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.objectOf(PropTypes.any),
      PropTypes.bool,
    ])
  ),
  handleVideoClick: PropTypes.func,
  isVideosPage: PropTypes.bool,
};

MainVideoCard.defaultProps = {
  video: {
    link: '/',
    title: '',
    info: 'Что-то пошло не так, здесь должно быть видео',
    imageUrl: '../../assets/img/mainvideo.png',
  },
  handleVideoClick: () => {},
  isVideosPage: true,
};

export default MainVideoCard;
