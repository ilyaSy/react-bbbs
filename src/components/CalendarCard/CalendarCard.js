import PropTypes from 'prop-types';
import Button from '../Button/Button';
import format from '../../utils/format';
import './CalendarCard.css';

const CalendarCard = ({
  event,
  handleCalendarCardClick,
  handlerRegisterSubmit,
  handlerDeleteEvent,
}) => {
  const { address, contact, title, seats, startAt, endAt, booked } = event;

  const startAtDate = new Date(startAt);
  const endAtDate = new Date(endAt);

  const day = format(startAtDate, 'dd');
  const startTime = format(startAtDate, 'KK:mm');
  const endTime = format(endAtDate, 'KK:mm');
  const monthName = format(startAtDate, 'LLLL');
  const dayName = format(startAtDate, 'EEEE');

  const handlerCardClick = () => {
    handleCalendarCardClick({
      ...event,
      isOpen: true,
    });
  };
  const handlerSubmit = (evt) => {
    evt.preventDefault();
    if (!booked) {
      handlerRegisterSubmit(event);
    } else {
      handlerDeleteEvent(event);
    }
  };

  return (
    <div
      className={`calendar ${booked ? 'calendar_onclick' : ''}`}
      onClick={handlerCardClick}
      role="presentation"
    >
      <div className="calendar__about">
        <p className="calendar__participants">Волонтёры + дети</p>
        <p className="calendar__date">
          {monthName} / {dayName}
        </p>
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
      <form className="calendar__sign-up" onSubmit={handlerSubmit}>
        <div className="calendar__sign-up_flex">
          {booked ? (
            <Button
              className="button button_color_blue button_color_blue_onclick button_color_blue-open"
              type="submit"
            >
              Отменить запись
            </Button>
          ) : (
            <Button
              className="button button_color_blue button_color_blue-nonactive"
              type="submit"
              disabled={seats > 0 ? false : 'disabled'}
            >
              Записаться
            </Button>
          )}
          <p className="calendar__sign-up__type_text">
            {seats > 0 ? `Осталось ${seats} мест` : 'Запись закрыта'}
          </p>
        </div>
        <Button
          className="button_color_blue button_color_blue-round button_color_blue-open"
          type="button"
        >
          <svg
            className="calendar__btn"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="19.5" stroke="#224CFF" />
            <circle cx="13.3346" cy="20.0002" r="1.66667" fill="#224CFF" />
            <circle cx="20.0026" cy="19.9999" r="1.66667" fill="#224CFF" />
            <circle cx="26.6667" cy="19.9999" r="1.66667" fill="#224CFF" />
          </svg>
        </Button>
      </form>
    </div>
  );
};

CalendarCard.propTypes = {
  event: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ).isRequired,
  handleCalendarCardClick: PropTypes.func.isRequired,
  handlerRegisterSubmit: PropTypes.func.isRequired,
  handlerDeleteEvent: PropTypes.func.isRequired,
  // address: PropTypes.string,
  // contact: PropTypes.string,
  // title: PropTypes.string,
  // seats: PropTypes.number,
  // startAt: PropTypes.string,
  // endAt: PropTypes.string,
};

CalendarCard.defaultProps = {
  // address: '',
  // contact: '',
  // title: '',
  // startAt: '',
  // endAt: '',
  // seats: 0,
};
export default CalendarCard;
