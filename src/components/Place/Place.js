import './Place.css';
import PropTypes from 'prop-types';
import Tag from '../Tag/Tag';

// TO DO: chosen + id props

const Place = ({ place }) => (
  <section className="event-soon-card">
    <div className="event-soon">
      <div className="event-soon__content-wrapper">
        <section className="profile-grid">
          <div className="profile-grid__column profile-grid__column_size_wide event-soon__description event-soon__description_size_big">
            <Tag modifier="tag_place_event" tagText="Выбор наставника" />
            <div className="event-soon__caption">
              <div className="event-soon__title">{place.title}</div>
              <div className="event-soon__subtitle">{place.name}</div>
            </div>
            <img src={place.imageUrl} className="event-soon__img" alt="Локация" />
            <a href={place.link} target="_blank" rel="noreferrer" className="event-soon__link">
              перейти на сайт
            </a>
          </div>

          <div className="profile-grid__column profile-grid__column_size_thin event-soon__about-wrapper event-soon__about-wrapper_size_big">
            <article className="event-article event-article_size_big">
              <div className="event-article__title event-article__title_size_big">{place.info}</div>
              <p className="event-article__paragraph event-article__paragraph_size_big">
                {place.description}
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
);

Place.propTypes = {
  place: PropTypes.objectOf(PropTypes.string),
};

Place.defaultProps = {
  place: {
    description: 'Описание не найдено',
    imageUrl: '',
    info: '',
    title: 'Место',
    name: '',
    link: '',
  },
};

export default Place;
