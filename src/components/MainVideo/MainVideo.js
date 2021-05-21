import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MainVideo.css';

const MainVideo = ({ video }) => (
  <div className="mainvideo">
    <div className="mainvideo__description">
      <Link className="mainlink" to={video.link} />
      <div className="mainvideo__name">
        <h3 className="mainvideo__title">{video.title}</h3>
        <p className="mainvideo__caption">{video.info}</p>
      </div>
      <a className="mainvideo__link" href={video.link}>
        смотреть видео
      </a>
    </div>
    <img src={video.imageUrl} alt="видео отсутствует" className="mainvideo__video" />
  </div>
);

MainVideo.propTypes = {
  video: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

MainVideo.defaultProps = {
  video: {
    link: '/',
    title: '',
    info: 'Что-то пошло не так, здесь должно быть видео',
    imageUrl: '../../assets/img/mainvideo.png',
  },
};

export default MainVideo;
