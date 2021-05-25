import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import format from '../../utils/format';

import Button from '../Button/Button';
import CalendarCard from '../CalendarCard/CalendarCard';
import Api from '../../utils/api';
import './Calendar.css';

const Calendar = ({ handleCalendarCardClick, handlerRegisterSubmit, handlerDeleteEvent }) => {
  const [events, setEvents] = useState([]);
  const [months, setMonths] = useState([]);
  const [activeMonth, setActiveMonth] = useState('');

  useEffect(() => {
    Api.getEvents()
      .then((data) => {
        const resetMonths = (dates) => {
          const dmonths = dates
            .map((date) => {
              const monthName = format(new Date(date.startAt), 'LLLL');
              return monthName[0].toUpperCase() + monthName.slice(1);
            })
            .filter((el, i, array) => array.indexOf(el) === i);

          return dmonths;
        };

        setActiveMonth('');
        setEvents(data);
        setMonths(resetMonths(data));
      })
      .catch((err) => {
        console.log(`Error: Calendar get events ${err}`);
      });
  }, []);

  const handleFilterMonth = (month) => {
    if (activeMonth && activeMonth === month) {
      setActiveMonth('');
    } else {
      setActiveMonth(month);
    }
  };

  return (
    <section className="grid-calendar content">
      <h1 className="heading">Календарь</h1>
      <div className="grid-calendar__buttons">
        {months.map((month) => (
          <Button
            className={`button button_color_black ${
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
              !activeMonth || format(new Date(event.startAt), 'LLLL') === activeMonth.toLowerCase()
          )
          .map((event) => (
            <CalendarCard
              event={event}
              key={event.id}
              handleCalendarCardClick={handleCalendarCardClick}
              handlerRegisterSubmit={handlerRegisterSubmit}
              handlerDeleteEvent={handlerDeleteEvent}
            />
          ))}
      </div>
    </section>
  );
};
Calendar.propTypes = {
  handleCalendarCardClick: PropTypes.func.isRequired,
  handlerRegisterSubmit: PropTypes.func.isRequired,
  handlerDeleteEvent: PropTypes.func.isRequired,
};
Calendar.defaultProps = {};
export default Calendar;
