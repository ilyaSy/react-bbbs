import PropTypes from 'prop-types';
import Popup from '../Popup/Popup';
import './PopupCities.css';

const cities = [
  'Алексин',
  'Барнаул',
  'Екатеринбург',
  'Зубцов',
  'Калининград',
  'Киреевск',
  'Коломна',
  'Новомосковск',
  'Орехово-Зуево',
  'Тверь',
  'Тула',
];

const PopupCities = ({ isOpen, onClose }) => (
  <Popup onClose={onClose} popupType="popup_type_cities" isOpen={isOpen}>
    <div className="cities">
      <h3 className="cities__heading">Выберите ваш город</h3>
      <div className="cities__cities">
        <div className="cities__capitals">
          <ul className="cities__list">
            <li className="cities__item">Москва</li>
            <li className="cities__item">Санкт-Петербург</li>
          </ul>
        </div>
        <ul className="cities__list">
          {cities.map((city) => (
            <li key={city} className="cities__item">
              {city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Popup>
);

PopupCities.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

PopupCities.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

export default PopupCities;
