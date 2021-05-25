import './Place.css';
import PropTypes from 'prop-types';
import Tag from '../Tag/Tag';

const Place = ({ place, size }) => (
  <section className="event-soon-card">
    <div className="event-soon">
      <div className="event-soon__content-wrapper">
        <section className={size === 'big' ? 'profile-grid' : 'events-grid__container'}>
          <div
            className={`profile-grid__column event-soon__description ${
              size === 'big'
                ? 'profile-grid__column_size_wide event-soon__description_size_big'
                : 'profile-grid__column_size_thin event-soon__description_size_small'
            }`}
          >
            {place.category && <Tag modifier="tag_place_event" tagText={place.category} />}
            <div className="event-soon__caption">
              <div className="event-soon__title">{place.title}</div>
              <div className="event-soon__subtitle">{place.name}</div>
            </div>
            {size === 'big' && (
              <img src={place.imageUrl} className="event-soon__img" alt="Локация" />
            )}
            <a href={place.link} target="_blank" rel="noreferrer" className="event-soon__link">
              перейти на сайт
            </a>
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
                {place.info}
              </div>
              <p
                className={`event-article__paragraph ${
                  size === 'big' ? 'event-article__paragraph_size_big' : ''
                }`}
              >
                {place.description}
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
);

// TO DO: отображение карточек в правильном порядке цветов (модификатор color класса event-soon__description)

Place.propTypes = {
  place: PropTypes.objectOf(PropTypes.any),
  size: PropTypes.string.isRequired,
};

Place.defaultProps = {
  place: {
    description: 'Описание не найдено',
    imageUrl: '',
    info: '',
    title: 'Место',
    name: '',
    link: '',
    chosen: false,
  },
};

export default Place;
