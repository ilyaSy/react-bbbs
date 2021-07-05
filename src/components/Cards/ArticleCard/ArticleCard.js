import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ArticleCard.css';

const ArticleCard = ({ article, color }) => (
  <article className="preview-article" style={{ backgroundColor: `${color}` }}>
    <Link className="mainlink" to="/read-watch/articles" />
    <h2 className="preview-article__title">{article.title}</h2>
    <a className="preview-article__link" href="/*">
      читать статью
    </a>
  </article>
);

ArticleCard.propTypes = {
  color: PropTypes.string,
  article: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

ArticleCard.defaultProps = {
  color: '#C8CAD1',
  article: {
    title: 'Статья отсутствует',
  },
};

export default ArticleCard;
