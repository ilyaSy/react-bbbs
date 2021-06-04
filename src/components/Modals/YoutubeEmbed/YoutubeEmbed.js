import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Popup from '../Popup/Popup';
import './youtubeEmbed.css';

const YoutubeEmbed = ({ onClose, link }) => {
  const youtubeParser = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };
  // Реулярное выражение чтобы извлечь embedId с ютуб ссылки
  const embedId = youtubeParser(link);
  return (
    <Popup popupType="popup_type_video" onClose={onClose}>
      <div className="video">
        <Button className="button-close popup__button-close video__button" onClick={onClose} />
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </Popup>
  );
};

YoutubeEmbed.propTypes = {
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
