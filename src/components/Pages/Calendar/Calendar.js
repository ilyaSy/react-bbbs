import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import formatDate from '../../../utils/formatDate';
import CalendarCard from '../../Cards/CalendarCard/CalendarCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
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
      <Heading>Календарь</Heading>

      <ScrollContainer
        list={months}
        activeItem={activeMonth}
        onClick={handleFilterMonth}
        sectionClass="grid-calendar__buttons"
      />

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
