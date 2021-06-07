import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Popup from '../Popup/Popup';
import formatDate from '../../../utils/formatDate';
import './PopupMeet.css';

const PopupMeet = ({
  selectedCalendarCard,
  closeModal,
  handleRegisterSubmit,
  handleDeleteEvent,
}) => {
  const {
    address,
    contact,
    title,
    seats,
    startAt = '',
    endAt = '',
    booked,
    description,
    takenSeats,
  } = selectedCalendarCard || {};

  const startAtDate = new Date(startAt);
  const endAtDate = new Date(endAt);

  const day = !startAt || formatDate(startAtDate, 'dd');
  const startTime = !startAt || formatDate(startAtDate, 'KK:mm');
  const endTime = !endAt || formatDate(endAtDate, 'KK:mm');
  const monthName = !startAt || formatDate(startAtDate, 'LLLL');
  const dayName = !startAt || formatDate(startAtDate, 'EEEE');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (booked) {
      handleDeleteEvent(selectedCalendarCard);
    } else {
      handleRegisterSubmit(selectedCalendarCard);
    }
  };

  return (
    <Popup popupType="popup__meet" onClose={closeModal}>
      <div className="calendar calendar__popup">
        <Button className="button-close popup__button-close" onClick={closeModal} />
        <div className="calendar__about_popup">
          <p className="calendar__participants">Волонтёры + дети</p>
          <p className="calendar__date">
            {' '}
            {monthName} / {dayName}
          </p>
        </div>
        <div className="calendar__about_popup">
          <h2 className="calendar__event">{title}</h2>
          <p className="calendar__day">{day}</p>
        </div>
        <ul className="calendar__contacts">
          <li className="calendar__contacts-item">
            <p className="calendar__time">
              {startTime}-{endTime}
            </p>
          </li>
          <li className="calendar__contacts-item">
            <p className="calendar__adress">{address}</p>
          </li>
          <li className="calendar__contacts-item">
            <p className="calendar__phone">{contact}</p>
          </li>
        </ul>
        <p className="calendar__text_popup">{description}</p>
        <div className="calendar__sign-up">
          <div className="calendar__sign-up_flex">
            {booked ? (
              <Button
                className="button button_color_blue button_color_blue_onclick button_color_blue-open"
                type="button"
                onClick={handleSubmit}
              >
                Отменить запись
              </Button>
            ) : (
              <Button
                className="button button_color_blue button_color_blue-nonactive"
                type="button"
                onClick={handleSubmit}
                disabled={seats - takenSeats > 0 ? false : 'disable'}
              >
                Записаться
              </Button>
            )}
            <p className="calendar__sign-up__type_text">
              {' '}
              {seats - takenSeats > 0 ? `Осталось ${seats - takenSeats} мест` : 'Запись закрыта'}
            </p>
          </div>
        </div>
      </div>
    </Popup>
  );
};
PopupMeet.propTypes = {
  selectedCalendarCard: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.any),
    ])
  ),
  closeModal: PropTypes.func.isRequired,
  handleRegisterSubmit: PropTypes.func.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
};

PopupMeet.defaultProps = {
  selectedCalendarCard: {},
};

export default PopupMeet;
