import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import formatDate from '../../../utils/formatDate';
import CalendarCard from '../../Cards/CalendarCard/CalendarCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import useCalendar from '../../../hooks/useCalendar';
import './Calendar.css';

const Calendar = ({ handleCalendarCardClick, handleRegisterSubmit, handleDeleteEvent, events }) => {
  const [activeMonth, setActiveMonth] = useState('');
  const { months } = useCalendar(events);
  const { city: activeCity } = useContext(CurrentUserContext);

  useEffect(() => {
    setActiveMonth('');
  }, []);

  const handleFilterMonth = (month) => {
    if (activeMonth && activeMonth === month) {
      setActiveMonth('');
    } else {
      setActiveMonth(month);
    }
  };
  //  Функция для рендера карточек или текст , если их нет
  const renderEvents = () => {
    const newEvents = events
      .filter((event) => event.city === activeCity)
      .filter(
        (event) =>
          !activeMonth || formatDate(new Date(event.startAt), 'LLLL') === activeMonth.toLowerCase()
      )
      .map((event) => (
        <CalendarCard
          event={event}
          key={event.id}
          handleCalendarCardClick={handleCalendarCardClick}
          handleRegisterSubmit={handleRegisterSubmit}
          handleDeleteEvent={handleDeleteEvent}
        />
      ));
    if (activeCity && newEvents.length === 0) {
      return <p className="calendar__not-events">В вашем городе нет событий</p>;
    }
    if (!activeCity && newEvents.length === 0) {
      return <p className="calendar__not-events">Выберите ваш город в профиле</p>;
    }
    return newEvents;
  };

  return (
    <section className="grid-calendar content main__section">
      <Helmet>
        <title>Календарь</title>
        <meta name="description" content="calendar" />
      </Helmet>
      <Heading>Календарь</Heading>
      <ScrollContainer
        list={months}
        activeItem={activeMonth}
        onClick={handleFilterMonth}
        sectionClass="grid-calendar__buttons"
      />
      <div className="grid-calendar__grid">{renderEvents()}</div>
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
