import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import formatDate from '../../../utils/formatDate';
import calendarBtn from '../../../assets/img/calendar-btn.svg';
import CalendarCardLi from './CalendarCardLi';
import './CalendarCard.css';

const CalendarCard = ({
  event,
  handleCalendarCardClick,
  handleRegisterSubmit,
  handleDeleteEvent,
}) => {
  const { address, contact, title, seats, takenSeats, startAt, endAt, booked } = event;
  const startAtDate = new Date(startAt);
  const endAtDate = new Date(endAt);
  const day = formatDate(startAtDate, 'dd');
  const startTime = formatDate(startAtDate, 'KK:mm');
  const endTime = formatDate(endAtDate, 'KK:mm');
  const monthName = formatDate(startAtDate, 'LLLL');
  const dayName = formatDate(startAtDate, 'EEEE');

  const handleCardClick = () => {
    handleCalendarCardClick({
      ...event,
      isOpen: true,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!booked) {
      handleRegisterSubmit(event);
    } else {
      handleDeleteEvent(event);
    }
  };

  return (
    <div className={`calendar ${booked && 'calendar_onclick'}`}>
      <div className="calendar__about">
        <p className="calendar__participants">Волонтёры + дети</p>
        <p className="calendar__date">
          {monthName} / {dayName}
        </p>
        <h2 className="calendar__event">{title}</h2>
        <p className="calendar__day">{day}</p>
      </div>
      <ul className="calendar__contacts">
        <CalendarCardLi value={`${startTime}-${endTime}`} classTag="time" />
        <CalendarCardLi value={address} classTag="address" />
        <CalendarCardLi value={contact} classTag="phone" />
      </ul>
      <form className="calendar__sign-up" onSubmit={handleSubmit}>
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
              disabled={seats - takenSeats > 0 ? false : 'disabled'}
            >
              Записаться
            </Button>
          )}
          <p className="calendar__sign-up__type_text">
            {seats - takenSeats > 0 ? `Осталось ${seats - takenSeats} мест` : 'Запись закрыта'}
          </p>
        </div>
        <Button
          className={`button_color_blue button_color_blue-round button_color_blue-open ${
            booked && 'button_color_blue_onclick'
          }`}
          type="button"
          onClick={handleCardClick}
        >
          <img className="calendar__btn" src={calendarBtn} alt="calendar" />
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
  handleRegisterSubmit: PropTypes.func.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
};

export default CalendarCard;
