import PropTypes from 'prop-types';

const ArticleRaW = ({ title, author, link, description, color }) => (
  <div className="event-soon">
    <div className="event-soon__content-wrapper">
      <section className="events-grid__container">
        <div
          className={`profile-grid__column profile-grid__column_size_thin event-soon__description ${`event-soon__description_color_${color}`} event-soon__description_size_small`}
        >
          <div className="event-soon__caption event-soon__caption_without_tag">
            <div className="event-soon__title">{title}</div>
            <div className="event-soon__subtitle">{author}</div>
          </div>
          <a href={link} target="_blank" rel="noreferrer" className="event-soon__link">
            перейти на сайт
          </a>
        </div>

        <div className="profile-grid__column profile-grid__column_size_thin event-soon__about-wrapper event-soon__about-wrapper_size_small">
          <article className="event-article event-article_size_small">
            <p className="event-article__paragraph">{description}</p>
          </article>
        </div>
      </section>
    </div>
  </div>
);

ArticleRaW.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default ArticleRaW;
