import Button from '../Button/Button';
import CalendarCard from '../CalendarCard/CalendarCard';
import './Calendar.css';
import { months, calendarCardData } from './calendarTest';

const Calendar = () => (
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
      {calendarCardData.map((card) => (
        <CalendarCard card={card} key={`${card}`} />
      ))}
    </div>
  </section>
);
export default Calendar;
