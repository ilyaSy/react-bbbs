import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import PersonalAccountCardStory from '../PersonalAccountCardStory/PersonalAccountCardStory';
import PopupStoryFriendship from '../PopupStoryFriendship/PopupStoryFriendship';
import './PersonalAccount.css';
import { profileStory } from '../../utils/serverApiTestConfig';

const PersonalAccount = ({ onLogout }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [storiesData, setStoriesData] = useState([]);

  useEffect(() => {
    setStoriesData(profileStory);
  }, []);
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handlerSubmitDeletePopup = (cardId) => {
    const newArr = storiesData.filter((story) => story.id !== cardId);
    setStoriesData(newArr);
  };

  return (
    <section className="personal-account content">
      <div className="personal-account__buttons">
        <Button className="personal-account__feedback-btn personal-account__text">
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
        <h2 className="personal-account__title">У вас нет записи на мероприятия</h2>
      </div>
      <div className="personal-account__add-meet">
        <Button
          className="button button_color_blue button_type_round"
          type="button"
          onClick={openPopup}
        />
        <Button className="button personal-account__meet-text" onClick={openPopup}>
          Добавить встречу
        </Button>
      </div>
      {isPopupOpen ? (
        <PopupStoryFriendship closePopup={closePopup} storiesData={storiesData} />
      ) : (
        storiesData.map((story) => (
          <PersonalAccountCardStory
            cardStory={story}
            key={story.id}
            openPopup={openPopup}
            handlerSubmitDeletePopup={handlerSubmitDeletePopup}
          />
        ))
      )}
    </section>
  );
};

export default PersonalAccount;

PersonalAccount.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

PersonalAccount.defaultProps = {};
