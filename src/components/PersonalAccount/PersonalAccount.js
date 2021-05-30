import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import Button from '../Button/Button';
import PersonalAccountCardStory from '../PersonalAccountCardStory/PersonalAccountCardStory';
import PopupStoryFriendship from '../PopupStoryFriendship/PopupStoryFriendship';
import PopupCities from '../PopupCities/PopupCities';
import CalendarCardProfile from '../CalendarCardProfile/CalendarCardProfile';
import Api from '../../utils/api';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './PersonalAccount.css';

const PersonalAccount = ({ onLogout, handleCalendarCardClick, events }) => {
  const currentUser = useContext(CurrentUserContext);
  const [cities, setCities] = useState([]);
  const [stories, setStories] = useState([]);
  const [isPopupCitiesOpen, setIsPopupCitiesOpen] = useState(false);
  const [cityId, setCityId] = useState(0);
  const [isPopupStoryOpen, setIsPopupStoryOpen] = useState(false);
  const [cardStory, setCardStory] = useState(null);

  useEffect(() => {
    Promise.all([Api.getCities(), Api.getProfileStory()])
      .then(([citiesData, storiesData]) => {
        setCities(citiesData);
        setStories(storiesData);
      })
      .catch((err) => {
        console.log(`Error: personal account ${err}`);
      });
  }, []);
  // Получаем данные календаря

  const openPopupStory = () => {
    setIsPopupStoryOpen(true);
  };
  const openPopupCities = () => {
    setIsPopupCitiesOpen(true);
  };
  const closePopup = () => {
    setIsPopupStoryOpen(false);
    setIsPopupCitiesOpen(false);
    setCardStory(null);
  };

  const handlePostProfileStory = (card) => {
    Api.postProfileStory({ ...card })
      .then((data) => {
        setStories([...stories, data]);
        closePopup();
      })
      .catch((err) => {
        console.log(`Error: post profile data ${err}`);
      });
  };

  const handleUpdaProfileStory = (card) => {
    Api.updateProfileStory(card)
      .then((data) => {
        setStories(stories.map((e) => (e.id === data.id ? data : e)));
        closePopup();
        setCardStory(null);
      })
      .catch((err) => {
        console.log(`Error: update profile data ${err}`);
      });
  };

  const handleSubmitDeletePopup = (cardId) => {
    Api.deleteProfileStory({ id: cardId })
      .then(() => {
        const newArr = stories.filter((story, id) => id !== cardId);
        setStories(newArr);
      })
      .catch((err) => {
        console.log(`Error: delete profile story ${err}`);
      });
  };

  const handleUpdateCity = (city) => {
    Api.updateUserInfo({
      city,
      id: currentUser.id,
      user: currentUser.user,
    }).then(() => {
      setCityId(city);
      console.log(cityId);
    });
  };

  return (
    <section className="personal-account content main__section">
      <div className="personal-account__buttons">
        <Button
          className="personal-account__feedback-btn personal-account__text"
          onClick={openPopupCities}
        >
          Изменить ваш город
        </Button>
        <Button
          className="personal-account__feedback-btn personal-account__text"
          onClick={onLogout}
        >
          Выйти
        </Button>
      </div>
      <div className="personal-account__events">
        <h2 className="personal-account__title">
          {events.filter((e) => e.booked).length === 0
            ? 'У вас нет записи на мероприятия'
            : 'Вы записаны на следующие мероприятия'}
        </h2>
        <div className="personal-account__event">
          {events
            .filter((e) => e.booked)
            .map((event) => (
              <CalendarCardProfile
                key={event.id}
                event={event}
                handleCalendarCardClick={handleCalendarCardClick}
              />
            ))}
        </div>
      </div>
      <div className="personal-account__add-meet">
        <Button
          className="button button_color_blue button_type_round"
          type="button"
          onClick={openPopupStory}
        />
        <Button className="button personal-account__meet-text" onClick={openPopupStory}>
          Добавить встречу
        </Button>
      </div>
      {isPopupStoryOpen ? (
        <PopupStoryFriendship
          closePopup={closePopup}
          postStoriesData={handlePostProfileStory}
          updateStoriesData={handleUpdaProfileStory}
          currentCardStory={cardStory}
        />
      ) : (
        stories.map((story, id) => (
          <PersonalAccountCardStory
            cardStory={story}
            key={`${story.id}`}
            cardId={id}
            openPopup={openPopupStory}
            handleSubmitDeletePopup={handleSubmitDeletePopup}
            setCardStory={setCardStory}
          />
        ))
      )}
      {isPopupCitiesOpen && (
        <PopupCities onClose={closePopup} setCityId={handleUpdateCity} cities={cities} isOpen />
      )}
    </section>
  );
};

export default PersonalAccount;

PersonalAccount.propTypes = {
  onLogout: PropTypes.func.isRequired,
  handleCalendarCardClick: PropTypes.func,
  events: PropTypes.arrayOf(PropTypes.any),
};

PersonalAccount.defaultProps = {
  handleCalendarCardClick: () => {},
  events: [],
};
