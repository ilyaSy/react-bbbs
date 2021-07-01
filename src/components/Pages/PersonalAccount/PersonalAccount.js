import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import Button from '../../UI/Button/Button';
import PersonalAccountCardStory from '../../Cards/PersonalAccountCardStory/PersonalAccountCardStory';
import PopupStoryFriendship from '../../Modals/PopupStoryFriendship/PopupStoryFriendship';
import CalendarCardProfile from '../../Cards/CalendarCardProfile/CalendarCardProfile';
import Api from '../../../utils/api';
import './PersonalAccount.css';

const PersonalAccount = ({ onLogout, handleCalendarCardClick, openPopupCities, events }) => {
  const currentUser = useContext(CurrentUserContext);

  const [stories, setStories] = useState([]);
  const [isPopupAddStoryOpen, setPopupAddStoryOpen] = useState(false);
  const [cardStory, setCardStory] = useState(null);

  useEffect(() => {
    // Api.getProfileStory().then(setStories).catch(console.log);
  }, []);

  const openPopupStory = () => setPopupAddStoryOpen(true);

  const closePopup = () => {
    setPopupAddStoryOpen(false);
    setCardStory(null);
  };

  const handlePostProfileStory = (card) => {
    Api.postProfileStory({ ...card })
      .then((data) => {
        setStories([...stories, data]);
        closePopup();
      })
      .catch(console.log);
  };

  const handleUpdaProfileStory = (card) => {
    Api.updateProfileStory(card)
      .then((data) => {
        console.log(data);
        setStories(stories.map((e) => (e.id === data.id ? data : e)));
        closePopup();
        setCardStory(null);
      })
      .catch(console.log);
  };

  const handleSubmitDeletePopup = (cardId) => {
    Api.deleteProfileStory({ id: cardId })
      .then(() => {
        const newArr = stories.filter((_, id) => id !== cardId);
        setStories(newArr);
      })
      .catch(console.log);
  };

  return (
    <section className="personal-account content main__section">
      <Helmet>
        <title>Личный Кабинет</title>
        <meta name="description" content="account" />
      </Helmet>
      <div className="personal-account__buttons">
        <Button
          className="personal-account__feedback-btn personal-account__text"
          onClick={openPopupCities}
        >
          {currentUser.city ? `${currentUser.city}. Изменить город` : 'Изменить ваш город'}
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
      {isPopupAddStoryOpen || stories.length === 0 ? (
        <PopupStoryFriendship
          closePopup={closePopup}
          postStoriesData={handlePostProfileStory}
          updateStoriesData={handleUpdaProfileStory}
          currentCardStory={cardStory}
        />
      ) : (
        <>
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
          {stories.map((story, id) => (
            <PersonalAccountCardStory
              cardStory={story}
              key={`${story.id}`}
              cardId={id}
              openPopup={openPopupStory}
              handleSubmitDeletePopup={handleSubmitDeletePopup}
              setCardStory={setCardStory}
            />
          ))}
        </>
      )}
    </section>
  );
};

export default PersonalAccount;

PersonalAccount.propTypes = {
  onLogout: PropTypes.func.isRequired,
  handleCalendarCardClick: PropTypes.func,
  events: PropTypes.arrayOf(PropTypes.any),
  openPopupCities: PropTypes.func,
};

PersonalAccount.defaultProps = {
  handleCalendarCardClick: () => {},
  events: [],
  openPopupCities: () => {},
};
