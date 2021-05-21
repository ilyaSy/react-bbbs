import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Article.css';

const Article = ({ article }) => (
  <article className="preview-article" style={{ backgroundColor: `${article.color}` }}>
    <Link className="mainlink" to="/" />
    <h2 className="preview-article__title">{article.title}</h2>
    <a className="preview-article__link" href="/">
      читать статью
    </a>
  </article>
);

Article.propTypes = {
  article: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Article;
