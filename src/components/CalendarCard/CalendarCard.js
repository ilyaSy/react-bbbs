import PropTypes from 'prop-types';
import { getDay, getMonth, getDate, getHours, getMinutes } from 'date-fns';
import { weekDays, months } from '../../utils/serverApiTestConfig';
import Button from '../Button/Button';
import './CalendarCard.css';

const CalendarCard = ({ event }) => {
  const { address, contact, title, seats, startAt, endAt } = event;

  const weekDay = getDay(new Date(startAt));
  const month = getMonth(new Date(startAt));
  const day = getDate(new Date(startAt));
  const startHour = getHours(new Date(startAt));
  const endHour = getHours(new Date(endAt));
  const startMinute = getMinutes(new Date(startAt));
  const endMinute = getMinutes(new Date(endAt));

  const addZero = (num) => {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }; // Идиотизм наверно, но умнее ничего не придумал ;D

  return (
    <div className="calendar">
      <div className="calendar__about">
        <p className="calendar__participants">Волонтёры + дети</p>
        <p className="calendar__date">
          {months[month]} / {weekDays[weekDay]}
        </p>
        <h2 className="calendar__event">{title}</h2>
        <p className="calendar__day">{day}</p>
      </div>
      <ul className="calendar__contacts">
        <li className="calendar__contacts-item">
          <p className="calendar__time">{`${addZero(startHour)}:${addZero(startMinute)}–${addZero(
            endHour
          )}:${addZero(endMinute)}`}</p>
        </li>
        <li className="calendar__contacts-item">
          <p className="calendar__adress">{address}</p>
        </li>
        <li className="calendar__contacts-item">
          <p className="calendar__phone">{contact}</p>
        </li>
      </ul>
      <div className="calendar__sign-up">
        <div className="calendar__sign-up_flex">
          <Button
            className="button button_color_blue button_color_blue_onclick button_color_blue-open"
            type="button"
          >
            Отменить запись
          </Button>
          <p className="calendar__sign-up__type_text">Осталось {seats} мест</p>
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
      </div>
    </div>
  );
};

CalendarCard.propTypes = {
  event: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ).isRequired,
  address: PropTypes.string,
  contact: PropTypes.string,
  title: PropTypes.string,
  seats: PropTypes.number,
  startAt: PropTypes.string,
  endAt: PropTypes.string,
};
CalendarCard.defaultProps = {
  address: '',
  contact: '',
  title: '',
  startAt: '',
  endAt: '',
  seats: 0,
};
export default CalendarCard;
