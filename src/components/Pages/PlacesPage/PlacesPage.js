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
import { setActiveFilters } from '../../../utils/filters';
import usePlaces from '../../../hooks/usePlaces';
import './PlacesPage.css';

// поместить эти данные на бэк
const ages = [
  { id: 1, name: '8-10 лет', slug: '8-10' },
  { id: 2, name: '11-13 лет', slug: '11-13' },
  { id: 3, name: '14-18 лет', slug: '14-18' },
  { id: 4, name: '18+ лет', slug: '18+' },
];

const PlacesPage = ({
  onRecommendPlace,
  openPopupCities,
  unauthCity,
  isPlacePopupOpened,
  handlePlacesFormSubmit,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [activeCategories, setActiveCategories] = useState();
  const [activeAgeRange, setActiveAgeRange] = useState('');
  const [currentCity, setCurrentCity] = useState(null);
  const { places, tags, chosenPlace } = usePlaces(currentCity);

  useEffect(() => {
    if (!currentUser && !unauthCity.cityId) openPopupCities();
  }, []);

  // получение айди текущего города для отправки запроса по местам этого города
  useEffect(() => {
    setCurrentCity(currentUser?.city || unauthCity?.cityId);
  }, [currentUser, unauthCity]);

  // ?
  const handleCategoryFilter = (category) => {
    setActiveCategories(setActiveFilters(activeCategories, category));
  };

  // ?
  const handleAgeFilter = (age) => {
    if (activeAgeRange && activeAgeRange === age) {
      setActiveAgeRange('');
    } else {
      setActiveAgeRange(age);
    }
  };

  // ?
  // const filterAgeRanges = (age) => {
  //   switch (activeAgeRange) {
  //     case '8-10 лет':
  //       return age >= 8 && age <= 10;
  //     case '11-13 лет':
  //       return age >= 11 && age <= 13;
  //     case '14-18 лет':
  //       return age >= 14 && age < 18;
  //     case '18+ лет':
  //       return age >= 18;
  //     default:
  //       return age;
  //   }
  // };

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
            list={tags}
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
      {/* нужно понять как будет рисоваться большая карточка, при каких условиях */}
      {(currentCity || unauthCity.id) && (
        <Card type="place" data={chosenPlace} color="yellow" size="big" />
      )}
      <section className="events-grid">
        {places &&
          places.map((place, i) => (
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
