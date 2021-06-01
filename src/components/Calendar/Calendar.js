import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import formatDate from '../../utils/formatDate';

import Button from '../Button/Button';
import CalendarCard from '../CalendarCard/CalendarCard';
import './Calendar.css';

const Calendar = ({ handleCalendarCardClick, handleRegisterSubmit, handleDeleteEvent, events }) => {
  const [months, setMonths] = useState([]);
  const [activeMonth, setActiveMonth] = useState('');

  useEffect(() => {
    const resetMonths = (dates) => {
      const dmonths = dates
        .map((date) => {
          const monthName = formatDate(new Date(date.startAt), 'LLLL');
          return monthName[0].toUpperCase() + monthName.slice(1);
        })
        .filter((el, i, array) => array.indexOf(el) === i);
      return dmonths;
    };

    setActiveMonth('');
    // setEvents(events);
    setMonths(resetMonths(events));
  }, []);

  const handleFilterMonth = (month) => {
    if (activeMonth && activeMonth === month) {
      setActiveMonth('');
    } else {
      setActiveMonth(month);
    }
  };

  return (
    <section className="grid-calendar content main__section">
      <h1 className="heading">Календарь</h1>
      <div className="grid-calendar__buttons">
        {months.map((month) => (
          <Button
            className={`button button_color_black button_place_scroll ${
              month === activeMonth && 'button_color_black_active'
            }`}
            type="button"
            key={`${month}`}
            onClick={() => {
              handleFilterMonth(month);
            }}
          >
            {month}
          </Button>
        ))}
      </div>
      <div className="grid-calendar__grid">
        {events
          .filter(
            (event) =>
              !activeMonth ||
              formatDate(new Date(event.startAt), 'LLLL') === activeMonth.toLowerCase()
          )
          .map((event) => (
            <CalendarCard
              event={event}
              key={event.id}
              handleCalendarCardClick={handleCalendarCardClick}
              handleRegisterSubmit={handleRegisterSubmit}
              handleDeleteEvent={handleDeleteEvent}
            />
          ))}
      </div>
    </section>
  );
};
Calendar.propTypes = {
  handleCalendarCardClick: PropTypes.func.isRequired,
  handleRegisterSubmit: PropTypes.func.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.any),
};
Calendar.defaultProps = {
  events: [],
};
export default Calendar;
