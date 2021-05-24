import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '../Button/Button';
import format from '../../utils/format';
import PopupConfirmDelete from '../PopupConfirmDelete/PopupConfirmDelete';

const PersonalAccountCardStory = ({ cardStory, openPopup, handlerSubmitDeletePopup }) => {
  const { place, image, date, description, feedback, id } = cardStory;
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handlerClick = () => {
    setIsDeletePopupOpen(true);
  };
  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
  };
  const feedbackText = () => {
    if (feedback === 'bad') return 'Плохо';
    if (feedback === 'good') return 'Было классно!';
    return 'Нормально';
  };

  // date
  const formatedDate = new Date(date);
  const day = !formatedDate || format(formatedDate, 'dd');
  const year = formatedDate.getFullYear();
  const monthName = !formatedDate || format(formatedDate, 'LLLL');

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

        <p className="personal-account__textarea-text">{description} </p>

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
          <Button className="personal-account__feedback-btn" type="button" onClick={openPopup}>
            Редактировать
          </Button>
          <Button className="personal-account__feedback-btn" type="button" onClick={handlerClick}>
            Удалить
          </Button>
        </div>
      </div>
      <PopupConfirmDelete
        place={place}
        handlerSubmitDeletePopup={handlerSubmitDeletePopup}
        cardId={id}
        isOpen={isDeletePopupOpen}
        closePopup={closeDeletePopup}
      />
    </div>
  );
};
PersonalAccountCardStory.propTypes = {
  cardStory: PropTypes.objectOf(PropTypes.any).isRequired,
  openPopup: PropTypes.func,
  handlerSubmitDeletePopup: PropTypes.func,
};
PersonalAccountCardStory.defaultProps = {
  openPopup: () => {},
  handlerSubmitDeletePopup: () => {},
};
export default PersonalAccountCardStory;
