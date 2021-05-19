import { useState, useEffect } from 'react';

import Button from '../Button/Button';
import CalendarCard from '../CalendarCard/CalendarCard';
import api from '../../utils/api';
import './Calendar.css';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .getEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.log(`Error: Calendar get events ${err}`);
      });
  }, []);

  return (
    <section className="grid-calendar content">
      <h1 className="heading">Календарь</h1>
      <div className="grid-calendar__buttons">
        <Button className="button button_color_black" type="button">
          Декабрь
        </Button>
        <Button className="button button_color_black" type="button">
          Январь
        </Button>
        <Button className="button button_color_black" type="button">
          Февраль
        </Button>
      </div>
      <div className="grid-calendar__grid">
        {events.map((event) => (
          <CalendarCard key={event.id} />
        ))}
      </div>
    </section>
  );
};
export default Calendar;
