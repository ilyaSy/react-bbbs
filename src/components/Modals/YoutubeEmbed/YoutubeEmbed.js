import PropTypes from 'prop-types';
import Popup from '../Popup/Popup';
import { youtubeParser } from '../../../utils/youtubeLinkParser';
import './youtubeEmbed.css';

const YoutubeEmbed = ({ onClose, link, title, info }) => {
  const embedId = youtubeParser(link);

  return (
    <Popup popupType="popup_type_video" onClose={onClose}>
      <div className="apivideo">
        <iframe
          className="apivideo__video"
          id="ytplayer"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <h3 className="apivideo__title">{title}</h3>
        <p className="apivideo__text">{info}</p>
      </div>
    </Popup>
  );
};

YoutubeEmbed.propTypes = {
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string,
  info: PropTypes.string,
};

YoutubeEmbed.defaultProps = {
  title: '',
  info: '',
};

export default YoutubeEmbed;
