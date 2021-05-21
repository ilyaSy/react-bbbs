import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import format from '../../utils/format';

import Button from '../Button/Button';
import CalendarCard from '../CalendarCard/CalendarCard';
import Api from '../../utils/api';
import './Calendar.css';
import months from './calendarTest';

const Calendar = ({ handleCalendarCardClick, handlerRegisterSubmit }) => {
  const [events, setEvents] = useState([]);
  // const [months, setMonths] = useState([]);
  useEffect(() => {
    Api.getEvents()
      .then((data) => {
        setEvents(data);
        // setMonths(data.map(date => Date(date.startAt).))
        // console.log(
        //   data
        //     .map((date) =>
        //       format(new Date(date.startAt), 'LLLL')
        //     )
        //     .filter((el, i, array) => array.indexOf(el) === i)
        // );
      })
      .catch((err) => {
        console.log(`Error: Calendar get events ${err}`);
      });
  }, []);

  return (
    <section className="grid-calendar content">
      <h1 className="heading">Календарь</h1>
      <div className="grid-calendar__buttons">
        {months.map((month) => (
          <Button className="button button_color_black" type="button" key={`${month}`}>
            {month}
          </Button>
        ))}
      </div>
      <div className="grid-calendar__grid">
        {events.map((event) => (
          <CalendarCard
            event={event}
            key={event.id}
            handleCalendarCardClick={handleCalendarCardClick}
            handlerRegisterSubmit={handlerRegisterSubmit}
          />
        ))}
      </div>
    </section>
  );
};
Calendar.propTypes = {
  handleCalendarCardClick: PropTypes.func.isRequired,
  handlerRegisterSubmit: PropTypes.func.isRequired,
};
Calendar.defaultProps = {};
export default Calendar;
