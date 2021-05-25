import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import CreatePlace from '../CreatePlace/CreatePlace';
import Place from '../Place/Place';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './WhereToGo.css';
import Api from '../../utils/api';

const categories = [
  'Все',
  'Выбор наставника',
  'Музеи',
  'Парки',
  'Театры',
  'Спорт',
  'Экскурсии',
  'Секции',
];

const ages = ['8-10 лет', '11-13 лет', '14-18 лет', '18+ лет'];

const WhereToGo = ({ onRecommendPlace }) => {
  const [places, setPlaces] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [activeAgeRange, setActiveAgeRange] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    Api.getPlaces()
      .then((data) => {
        console.log(data);
        setPlaces(data);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  const handleCategoryFilter = (category) => {
    if (activeCategory && activeCategory === category) {
      setActiveCategory('');
    } else {
      setActiveCategory(category);
    }
  };

  const handleAgeFilter = (age) => {
    if (activeAgeRange && activeAgeRange === age) {
      setActiveAgeRange('');
    } else {
      setActiveAgeRange(age);
    }
  };

  return (
    <>
      <section className="event-choice">
        <h1 className="heading">Куда пойти</h1>
        <div className="buttons-scroll buttons-scroll_place_event">
          {categories.map((category) => (
            <Button
              className="button button_color_black"
              type="button"
              key={category}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="buttons-scroll buttons-scroll_place_event">
          {ages.map((age) => (
            <Button
              className="button button_color_black"
              type="button"
              key={age}
              onClick={() => handleAgeFilter(age)}
            >
              {age}
            </Button>
          ))}
        </div>
      </section>
      {currentUser && <CreatePlace onRecommendPlace={onRecommendPlace} />}
      {activeCategory === 'Все' && (
        <Place place={places.filter((place) => place.chosen)[0]} size="big" />
      )}
      <section className="events-grid">
        {places
          .filter((place) => activeCategory === 'Все' || activeCategory === place.category)
          .map((place) => (
            <Place key={place.id} place={place} size="small" />
          ))}
      </section>
    </>
  );
};

WhereToGo.propTypes = {
  onRecommendPlace: PropTypes.func.isRequired,
};

// TO DO:
// фильтрация по возрасту

export default WhereToGo;
