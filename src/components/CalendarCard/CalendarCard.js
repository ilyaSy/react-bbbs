import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './CalendarCard.css';

const CalendarCard = ({ card }) => {
  const { participants, date, event, day, time, address, phone, freePlaces } = card;
  return (
    <div className="calendar">
      <div className="calendar__about">
        <p className="calendar__participants">{participants}</p>
        <p className="calendar__date">
          {date.month} / {date.weekDay}
        </p>
        <h2 className="calendar__event">{event}</h2>
        <p className="calendar__day">{day}</p>
      </div>
      <ul className="calendar__contacts">
        <li className="calendar__contacts-item">
          <p className="calendar__time">{time}</p>
        </li>
        <li className="calendar__contacts-item">
          <p className="calendar__adress">{address}</p>
        </li>
        <li className="calendar__contacts-item">
          <p className="calendar__phone">{phone}</p>
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
          <p className="calendar__sign-up__type_text">Осталось {freePlaces}</p>
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
  card: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
};

export default CalendarCard;
