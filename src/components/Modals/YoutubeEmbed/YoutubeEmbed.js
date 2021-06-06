import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Popup from '../Popup/Popup';
import youtubeLinkParser from '../../../utils/youtubeLinkParser';
import './youtubeEmbed.css';

const YoutubeEmbed = ({ onClose, link }) => {
  const embedId = youtubeLinkParser(link);

  return (
    <Popup popupType="popup_type_video" onClose={onClose}>
      <div className="video">
        <Button className="button-close popup__button-close video__button" onClick={onClose} />
        <iframe
          className="youtube"
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
