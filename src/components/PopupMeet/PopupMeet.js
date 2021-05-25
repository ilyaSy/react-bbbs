import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import format from '../../utils/format';
import './PopupMeet.css';

const PopupMeet = ({
  selectedCalendarCard,
  closeModal,
  handlerRegisterSubmit,
  handlerDeleteEvent,
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
    isOpen,
  } = selectedCalendarCard || {};

  const startAtDate = new Date(startAt);
  const endAtDate = new Date(endAt);

  const day = !startAt || format(startAtDate, 'dd');
  const startTime = !startAt || format(startAtDate, 'KK:mm');
  const endTime = !endAt || format(endAtDate, 'KK:mm');
  const monthName = !startAt || format(startAtDate, 'LLLL');
  const dayName = !startAt || format(startAtDate, 'EEEE');

  const handlerSubmit = (evt) => {
    evt.preventDefault();
    if (booked) {
      handlerDeleteEvent(selectedCalendarCard);
    } else {
      handlerRegisterSubmit(selectedCalendarCard);
    }
  };

  return (
    <Popup popupType="popup__meet" isOpen={isOpen}>
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
                onClick={handlerSubmit}
              >
                Отменить запись
              </Button>
            ) : (
              <Button
                className="button button_color_blue button_color_blue-nonactive"
                type="button"
                onClick={handlerSubmit}
                disabled={seats > 0 ? false : 'disable'}
              >
                Записаться
              </Button>
            )}
            <p className="calendar__sign-up__type_text">
              {' '}
              {seats > 0 ? `Осталось ${seats} мест` : 'Запись закрыта'}
            </p>
          </div>
        </div>
      </div>
    </Popup>
  );
};
PopupMeet.propTypes = {
  selectedCalendarCard: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ).isRequired,
  closeModal: PropTypes.func.isRequired,
  handlerRegisterSubmit: PropTypes.func.isRequired,
  handlerDeleteEvent: PropTypes.func.isRequired,
};

PopupMeet.defaultProps = {};

export default PopupMeet;
