import { Link } from 'react-router-dom';
import './Card.css';
import PropTypes from 'prop-types';
import Tag from '../../UI/Tag/Tag';

const Card = ({ type, size, color, data }) => (
  <section className="event-soon-card">
    <div className="event-soon">
      <div className="event-soon__content-wrapper">
        <section className={size === 'big' ? 'profile-grid' : 'events-grid__container'}>
          <div
            className={`profile-grid__column event-soon__description event-soon__description_color_${color} ${
              size === 'big'
                ? 'profile-grid__column_size_wide event-soon__description_size_big'
                : 'profile-grid__column_size_thin event-soon__description_size_small'
            }`}
          >
            {type === 'place' && data.chosen && (
              <Tag modifier="tag_place_event" tagText="Выбор наставника" />
            )}
            <div
              className={`event-soon__caption ${
                size === 'big' ? 'event-soon__caption_size_big' : 'event-soon__caption_with_tag'
              }`}
            >
              {type === 'place' && (
                <Link className="event-soon__title" to="/where-to-go">
                  <div className="event-soon__title">{data.title}</div>
                </Link>
              )}
              {type === 'article' && <div className="event-soon__title">{data.title}</div>}
              <div className="event-soon__subtitle">
                {type === 'place' && data.address}
                {type === 'article' && data.author}
              </div>
            </div>
            {data.chosen && size === 'big' && (
              <Link className="event-soon__img" to="/where-to-go">
                <img src={data.imageUrl} className="event-soon__img" alt="Локация" />
              </Link>
            )}
            {data.link && (
              <a href={data.link} target="_blank" rel="noreferrer" className="event-soon__link">
                перейти на сайт
              </a>
            )}
          </div>

          <div
            className={`profile-grid__column profile-grid__column_size_thin event-soon__about-wrapper ${
              size === 'big'
                ? 'event-soon__about-wrapper_size_big'
                : 'event-soon__about-wrapper_size_small'
            }`}
          >
            <article
              className={`event-article ${
                size === 'big' ? 'event-article_size_big' : 'event-article_size_small'
              }`}
            >
              <div
                className={`event-article__title  ${
                  size === 'big'
                    ? 'event-article__title_size_big'
                    : 'event-article__title_size_small'
                }`}
              >
                {data.info}
                {data.type}
              </div>
              <p
                className={`event-article__paragraph ${
                  size === 'big' ? 'event-article__paragraph_size_big' : ''
                }`}
              >
                {data.description}
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
);

// TO DO:
// * type и category это одно и то же (познавательное vs театры/музеи/экскурсии) ???

Card.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any),
  size: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Card.defaultProps = {
  data: {
    text: 'Текст не найден',
    imageUrl: 'Изображение не найдено',
    info: '',
    title: 'Название',
    address: '',
    author: '',
    link: '',
    chosen: false,
  },
  color: '',
};

export default Card;
