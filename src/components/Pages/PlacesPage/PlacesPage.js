import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlacesFormPreview from '../../Cards/PlacesFormPreview/PlacesFormPreview';
import Card from '../../Cards/Card/Card';
import Api from '../../../utils/api';
import defineCardColor from '../../../utils/renderColors';
import Heading from '../../UI/Heading/Heading';
import Button from '../../UI/Button/Button';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import { setActiveFilters, filterItemByFiltersList } from '../../../utils/filters';
import './PlacesPage.css';

const ages = ['8-10 лет', '11-13 лет', '14-18 лет', '18+ лет'];

const PlacesPage = ({ onRecommendPlace, openPopupCities, unauthСity, isPlacePopupOpened }) => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategorys, setActiveCategorys] = useState(['Все']);
  const [activeAgeRange, setActiveAgeRange] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    Api.getPlaces()
      .then((data) => {
        setPlaces(data);
        const categoriesData = data
          .map((place) => place.category)
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setCategories(['Все', ...categoriesData]);
      })
      .catch(console.log);

    if (!currentUser && !unauthСity) {
      openPopupCities();
    }
  }, []);

  const handleCategoryFilter = (category) => {
    setActiveCategorys(setActiveFilters(activeCategorys, category));
  };

  const handleAgeFilter = (age) => {
    if (activeAgeRange && activeAgeRange === age) {
      setActiveAgeRange('');
    } else {
      setActiveAgeRange(age);
    }
  };

  const filterAgeRanges = (age) => {
    switch (activeAgeRange) {
      case '8-10 лет':
        return age >= 8 && age <= 10;
      case '11-13 лет':
        return age >= 11 && age <= 13;
      case '14-18 лет':
        return age >= 14 && age < 18;
      case '18+ лет':
        return age >= 18;
      default:
        return age;
    }
  };

  const changeCity = () => {
    if (currentUser?.city) {
      return `${currentUser.city}. Изменить город` || 'Изменить ваш город';
    }
    if (unauthСity) {
      return `${unauthСity}. Изменить город`;
    }
    return 'Изменить ваш город';
  };

  return (
    <section className="where-to-go content main__section">
      <div className="personal-account__buttons">
        <Button
          className="personal-account__feedback-btn personal-account__text"
          onClick={openPopupCities}
        >
          {changeCity()}
        </Button>
      </div>
      <section className="event-choice">
        <Heading>Куда пойти</Heading>
        <div className="scroll-container">
          <ScrollContainer
            list={categories}
            activeItems={activeCategorys}
            onClick={handleCategoryFilter}
            sectionSubClass="buttons-scroll_place_event"
          />
          <ScrollContainer
            list={ages}
            activeItem={activeAgeRange}
            onClick={handleAgeFilter}
            sectionSubClass="buttons-scroll_place_event"
          />
        </div>
      </section>
      {currentUser && (
        <PlacesFormPreview
          onRecommendPlace={onRecommendPlace}
          isPlacePopupOpened={isPlacePopupOpened}
        />
      )}
      {activeCategorys[0] === 'Все' && (
        <Card
          type="place"
          data={places.filter((place) => place.chosen)[0]}
          color="yellow"
          size="big"
        />
      )}
      <section className="events-grid">
        {places
          .filter((place) => filterItemByFiltersList(activeCategorys, place.category))
          .filter((place) => filterAgeRanges(place.age))
          .sort((a, b) => activeCategorys.indexOf(a.category) > activeCategorys.indexOf(b.category))
          .map((place, i) => (
            <Card
              type="place"
              key={place.id}
              data={place}
              color={defineCardColor(i)}
              size="small"
            />
          ))}
      </section>
    </section>
  );
};

PlacesPage.propTypes = {
  onRecommendPlace: PropTypes.func,
  openPopupCities: PropTypes.func,
  unauthСity: PropTypes.string,
  isPlacePopupOpened: PropTypes.bool.isRequired,
};
PlacesPage.defaultProps = {
  onRecommendPlace: () => {},
  openPopupCities: () => {},
  unauthСity: () => {},
};

export default PlacesPage;
