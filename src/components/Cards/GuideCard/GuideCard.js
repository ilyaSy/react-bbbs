import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './GuideCard.css';

const GuideCard = ({ title, imageUrl, figure }) => (
  <li className="guide__item">
    <Link className="mainlink" to="/" />
    <div className="guide__img-wrapper">
      <img className={`guide__img ${`guide__img_${figure}`}`} src={imageUrl} alt={title} />
    </div>
    <h3 className="guide__caption">{title}</h3>
  </li>
);

GuideCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  figure: PropTypes.string,
};

GuideCard.defaultProps = {
  figure: '',
};

export default GuideCard;
