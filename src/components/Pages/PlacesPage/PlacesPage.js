import { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import PlacesFormPreview from '../../Cards/PlacesFormPreview/PlacesFormPreview';
import Card from '../../Cards/Card/Card';
import defineCardColor from '../../../utils/renderColors';
import Heading from '../../UI/Heading/Heading';
import Button from '../../UI/Button/Button';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import { setActiveFilters, filterItemByFiltersList } from '../../../utils/filters';
import usePlacesCategories from '../../../hooks/usePlacesCategories';
import './PlacesPage.css';

const ages = ['8-10 лет', '11-13 лет', '14-18 лет', '18+ лет'];

const PlacesPage = ({
  onRecommendPlace,
  openPopupCities,
  unauthCity,
  isPlacePopupOpened,
  handlePlacesFormSubmit,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [activeCategories, setActiveCategories] = useState(['Все']);
  const [activeAgeRange, setActiveAgeRange] = useState('');
  const [currentCity, setCurrentCity] = useState(null);
  const { places, categories, chosenPlace } = usePlacesCategories(currentCity);

  useEffect(() => {
    if (!currentUser && !unauthCity.cityId) openPopupCities();
  }, []);

  useEffect(() => {
    setCurrentCity(currentUser?.city || unauthCity.cityId);
  }, [currentUser, unauthCity]);

  const handleCategoryFilter = (category) => {
    setActiveCategories(setActiveFilters(activeCategories, category));
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
    if (currentUser) {
      return `${currentUser.cityName}. Изменить город` || 'Изменить ваш город';
    }
    if (unauthCity.cityName) {
      return `${unauthCity.cityName}. Изменить город`;
    }
    return 'Изменить ваш город';
  };

  return (
    <section className="where-to-go content main__section">
      <Helmet>
        <title>Куда пойти</title>
        <meta name="description" content="places" />
      </Helmet>
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
            activeItems={activeCategories}
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
          handlePlacesFormSubmit={handlePlacesFormSubmit}
        />
      )}
      {activeCategories[0] === 'Все' && activeAgeRange === '' && chosenPlace && (
        <Card type="place" data={chosenPlace} color="yellow" size="big" />
      )}
      <section className="events-grid">
        {places
          .filter((place) => (currentCity ? place.city === currentCity : place))
          .filter((place) => filterItemByFiltersList(activeCategories, place.category))
          .filter((place) => filterAgeRanges(place.age))
          .sort(
            (a, b) => activeCategories.indexOf(a.category) > activeCategories.indexOf(b.category)
          )
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
  unauthCity: PropTypes.objectOf(PropTypes.any),
  isPlacePopupOpened: PropTypes.bool.isRequired,
  handlePlacesFormSubmit: PropTypes.func,
};
PlacesPage.defaultProps = {
  onRecommendPlace: () => {},
  openPopupCities: () => {},
  unauthCity: {},
  handlePlacesFormSubmit: () => {},
};

export default PlacesPage;
