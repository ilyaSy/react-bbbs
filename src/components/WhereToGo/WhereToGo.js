import { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import CreatePlace from '../CreatePlace/CreatePlace';
import Place from '../Place/Place';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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

const placesToGo = [
  {
    chosen: true,
    title: 'Прекрасное место',
    name: 'Предполагаемые занятия',
    info: 'С кем идти',
    link: 'https://www.moscowzoo.ru/',
    description:
      'Развёрнутое описание опыта посещения. Развёрнутое описание опыта посещения. Развёрнутое описание опыта посещения.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/20/Common_zebra_at_masai_mara_kenya_02.jpg',
    id: 1,
  },
  {
    chosen: false,
    title: 'Прекрасное место',
    name: 'Предполагаемые занятия',
    info: 'С кем идти',
    link: 'https://www.moscowzoo.ru/',
    description:
      'Развёрнутое описание опыта посещения. Развёрнутое описание опыта посещения. Развёрнутое описание опыта посещения.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/20/Common_zebra_at_masai_mara_kenya_02.jpg',
    id: 2,
  },
  {
    chosen: true,
    title: 'Прекрасное место',
    name: 'Предполагаемые занятия',
    info: 'С кем идти',
    link: 'https://www.moscowzoo.ru/',
    description:
      'Развёрнутое описание опыта посещения. Развёрнутое описание опыта посещения. Развёрнутое описание опыта посещения.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/20/Common_zebra_at_masai_mara_kenya_02.jpg',
    id: 3,
  },
  {
    chosen: false,
    title: 'Прекрасное место',
    name: 'Предполагаемые занятия',
    info: 'С кем идти',
    link: 'https://www.moscowzoo.ru/',
    description:
      'Развёрнутое описание опыта посещения. Развёрнутое описание опыта посещения. Развёрнутое описание опыта посещения.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/2/20/Common_zebra_at_masai_mara_kenya_02.jpg',
    id: 4,
  },
];

const WhereToGo = ({ onRecommendPlace }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
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
      {currentUser && <CreatePlace onRecommendPlace={onRecommendPlace} />}
      {placesToGo.map((place) => (
        <Place key={place.id} place={place} />
      ))}
    </>
  );
};

WhereToGo.propTypes = {
  onRecommendPlace: PropTypes.func.isRequired,
};

// TO DO:
// Выводить карточки по условию: первая карточка "выбор наставника" (chosen) выводится в развёрнутом полном виде (как на главной),
// остальные — в мини версии.

export default WhereToGo;
