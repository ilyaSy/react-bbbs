import PropTypes from 'prop-types';
import Tag from '../../UI/Tag/Tag';

const ArticleRights = ({ title, tag, figure, color }) => (
  <li className="law__item">
    <div className="law__wrapper">
      <a href="/" className={`law__link law__link_form_${figure} law__link_color_${color}`}>
        <h3 className="law__heading">{title}</h3>
        <Tag tagText={tag.name} />
      </a>
    </div>
  </li>
);

ArticleRights.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.objectOf(PropTypes.any).isRequired,
  figure: PropTypes.string,
  color: PropTypes.string,
};

ArticleRights.defaultProps = {
  figure: '',
  color: 'yellow',
};

export default ArticleRights;
