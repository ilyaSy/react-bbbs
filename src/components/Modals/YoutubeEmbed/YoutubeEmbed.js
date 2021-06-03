import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Popup from '../Popup/Popup';
import './youtubeEmbed.css';

const YoutubeEmbed = ({ embedId, onClose }) => (
  <Popup popupType="popup_type_video">
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

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default YoutubeEmbed;
