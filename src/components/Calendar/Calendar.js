import Button from '../Button/Button';
import './Calendar.css';
import CalendarCard from '../CalendarCard/CalendarCard';

const Calendar = () => (
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
      <CalendarCard />
      <CalendarCard />
      <CalendarCard />
      <CalendarCard />
      <CalendarCard />
      <CalendarCard />
    </div>
  </section>
);
export default Calendar;
