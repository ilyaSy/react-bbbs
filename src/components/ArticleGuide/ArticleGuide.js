import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ArticleGuide.css';

const ArticleGuide = ({ title, text, imageUrl, figure, size }) => (
  <li className="guide__item">
    <Link className="mainlink" to="/" />
    <div className="guide__img-wrapper">
      <img className={`guide__img ${`guide__img_${figure}`}`} src={imageUrl} alt={title} />
    </div>
    <h3 className="guide__caption">{title}</h3>
    {size === 'big' && <p>{text}</p>}
  </li>
);

ArticleGuide.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  figure: PropTypes.string,
  size: PropTypes.string.isRequired,
};

ArticleGuide.defaultProps = {
  figure: 'round',
};

export default ArticleGuide;
