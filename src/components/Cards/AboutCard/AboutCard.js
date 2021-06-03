import PropTypes from 'prop-types';
import './AboutCard.css';

const AboutCard = ({ link, color, text, button, linkText }) => (
  <li className="project-card">
    <div className={`project-card__caption project-card__caption_color_${color}`}>
      <a className="project-card__title" href={link} target="_blank" rel="noopener noreferrer">
        {button}
      </a>
    </div>
    <article className="project-card__description">
      <p className="project-card__paragraph">{text}</p>
      <a href={link} target="_blank" className="project-card__link" rel="noreferrer">
        {linkText}
      </a>
    </article>
  </li>
);

AboutCard.propTypes = {
  link: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default AboutCard;
