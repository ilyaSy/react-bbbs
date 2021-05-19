import Button from '../Button/Button';
import './WhereToGo.css';

const places = [
  'Все',
  'Выбор наставников',
  'Музеи',
  'Парки',
  'Театры',
  'Спорт',
  'Экскурсии',
  'Секции',
];
const ages = ['8-10 лет', '11-13 лет', '14-18 лет', '18+ лет'];

const WhereToGo = () => (
  <section className="event-choice">
    <h1 className="heading">Куда пойти</h1>
    <div className="buttons-scroll buttons-scroll_place_event">
      {places.map((place) => (
        <Button className="button button_color_black" type="button" key={place}>
          {place}
        </Button>
      ))}
    </div>
    <div className="buttons-scroll buttons-scroll_place_event">
      {ages.map((age) => (
        <Button className="button button_color_black" type="button" key={age}>
          {age}
        </Button>
      ))}
    </div>
  </section>
);
export default WhereToGo;
