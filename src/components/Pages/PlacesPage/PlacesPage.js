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
import Api from '../../../utils/api';
import tagsFilter from '../../../utils/filtering';
import './PlacesPage.css';

const PlacesPage = ({
  onRecommendPlace,
  openPopupCities,
  unauthCity,
  isPlacePopupOpened,
  handlePlacesFormSubmit,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [activeTags, setActiveTags] = useState([]);
  const [params, setParams] = useState([]);
  const [places, setPlaces] = useState(null);
  const [tags, setTags] = useState([]);
  const [ageTags, setAgeTags] = useState([]);
  const [chosenPlace, setChosenPlace] = useState(null);
  const tagAll = { name: 'Все', id: 0, slug: '' };

  useEffect(() => {
    if (!currentUser && !unauthCity.cityId) openPopupCities();
    Api.getPlacesTags()
      .then((tagsData) => {
        const activity = tagsData.tagActivity;
        const age = tagsData.tagAge;
        activity.unshift(tagAll);
        setTags(activity);
        setAgeTags(age);
        setActiveTags([tagAll]);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    // получение айди текущего города для отправки запроса по местам этого города
    const city = currentUser?.city || unauthCity?.cityId;
    Api.getPlaces(city, params.join())
      .then((placesResp) => {
        const chosenIdx = placesResp.findIndex((itm) => itm.chosen === true);
        if (chosenIdx !== -1) {
          const chosen = placesResp.splice(chosenIdx, 1);
          setChosenPlace(chosen);
        } else setChosenPlace(null);
        setPlaces(placesResp);
      })
      .catch(console.log);
  }, [currentUser, unauthCity, params]);

  // фильтр по тегам места
  const handleCategoryFilter = (tag) => {
    tagsFilter(tag, activeTags, setParams, setActiveTags);
  };

  // фильтр по тегам возраста
  const handleAgeFilter = (tag) => {
    tagsFilter(tag, activeTags, setParams, setActiveTags);
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
            list={tags}
            activeItems={activeTags}
            onClick={handleCategoryFilter}
            sectionSubClass="buttons-scroll_place_event"
          />
          <ScrollContainer
            list={ageTags}
            activeItems={activeTags}
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
      {/* сейчас большая карточка - первая из массива places */}
      {chosenPlace && (
        <>
          <Card type="place" data={chosenPlace} color="yellow" size="big" />
          <p>Hello</p>
        </>
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
