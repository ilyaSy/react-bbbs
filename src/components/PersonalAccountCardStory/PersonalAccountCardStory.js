import PropTypes from 'prop-types';
import Button from '../Button/Button';

const PersonalAccountCardStory = ({ cardStory, openPopup }) => {
  const { place, image, date, description, feedback } = cardStory;
  const feedbackText = () => {
    if (feedback === 'bad') return 'Плохо';
    if (feedback === 'good') return 'Было классно!';
    return 'Нормально';
  };

  return (
    <dic className="personal-account__form">
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
          <h3 className="personal-account__subtitle-date">{date.day}</h3>
          <p className="personal-account__subtitle-month personal-account__subtitle-month_place_form">
            {date.month}, {date.year}
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
          <Button className="personal-account__feedback-btn" type="button">
            Удалить
          </Button>
        </div>
      </div>
    </dic>
  );
};
PersonalAccountCardStory.propTypes = {
  cardStory: PropTypes.objectOf(PropTypes.any).isRequired,
  openPopup: PropTypes.func,
};
PersonalAccountCardStory.defaultProps = {
  openPopup: () => {},
};
export default PersonalAccountCardStory;
