import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '../../UI/Button/Button';
import formatDate from '../../../utils/formatDate';
import PopupConfirmDelete from '../../Modals/PopupConfirmDelete/PopupConfirmDelete';

const PersonalAccountCardStory = ({
  cardStory,
  openPopup,
  handleSubmitDeletePopup,
  cardId,
  setCardStory,
}) => {
  const { place, image, date, text, feedback } = cardStory;
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handleClick = () => setIsDeletePopupOpen(true);
  const closeDeletePopup = () => setIsDeletePopupOpen(false);

  const feedbackText = () => {
    if (feedback === 'bad') return 'Плохо';
    if (feedback === 'good') return 'Было классно!';
    return 'Нормально';
  };

  const editStory = () => {
    setCardStory(cardStory);
    openPopup();
  };
  // date
  const formatedDate = new Date(date);
  const day = !formatedDate || formatDate(formatedDate, 'dd');
  const year = formatedDate.getFullYear();
  const monthName = !formatedDate || formatDate(formatedDate, 'LLLL');

  return (
    <div className="personal-account__form">
      <div className="personal-account__photo">
        <Button
          className="personal-account__button personal-account__button_closed"
          type="button"
        />
        <p className="personal-account__photo-text personal-account__photo-text_closed">
          Загрузить фото
        </p>
        <img className="personal-account__photo-opened" src={image} alt={place} />
      </div>
      <div className="personal-account__inputs personal-account__inputs_added">
        <h2 className="personal-account__input-heading">{place}</h2>

        <div className="personal-account__event-head">
          <h3 className="personal-account__subtitle-date">{day}</h3>
          <p className="personal-account__subtitle-month personal-account__subtitle-month_place_form">
            {monthName}, {year}
          </p>
        </div>

        <p className="personal-account__textarea-text">{`${text}`}</p>

        <div className="personal-account__feedback personal-account__feedback_added">
          <div
            className={`personal-account__feedback-button personal-account__feedback-button_${feedback}-active`}
          />
          <p
            className={`personal-account__feedback-text personal-account__feedback-text_type_${feedback}`}
          >
            {feedbackText()}
          </p>
        </div>

        <div className="personal-account__submit personal-account__submit-added">
          <Button className="personal-account__feedback-btn personal-account__share">
            Поделиться с куратором
          </Button>
          <Button className="personal-account__feedback-btn" type="button" onClick={editStory}>
            Редактировать
          </Button>
          <Button className="personal-account__feedback-btn" type="button" onClick={handleClick}>
            Удалить
          </Button>
        </div>
      </div>
      {isDeletePopupOpen ? (
        <PopupConfirmDelete
          place={place}
          handleSubmitDeletePopup={handleSubmitDeletePopup}
          cardId={cardId}
          closePopup={closeDeletePopup}
        />
      ) : null}
    </div>
  );
};
PersonalAccountCardStory.propTypes = {
  cardStory: PropTypes.objectOf(PropTypes.any).isRequired,
  openPopup: PropTypes.func,
  handleSubmitDeletePopup: PropTypes.func,
  cardId: PropTypes.number.isRequired,
  setCardStory: PropTypes.func,
};
PersonalAccountCardStory.defaultProps = {
  openPopup: () => {},
  handleSubmitDeletePopup: () => {},
  setCardStory: () => {},
};
export default PersonalAccountCardStory;
