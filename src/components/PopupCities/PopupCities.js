import PropTypes from 'prop-types';
import Popup from '../Popup/Popup';
import Button from '../Button/Button';
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

const PopupCities = ({ isOpen, onClose, setCity }) => {
  const handleCityClick = (event) => {
    setCity(event.target.textContent);
    onClose();
  };
  return (
    <Popup onClose={onClose} popupType="popup_type_cities" isOpen={isOpen}>
      <div className="cities">
        <h3 className="cities__heading">Выберите ваш город</h3>
        <div className="cities__cities">
          <div className="cities__capitals">
            <ul className="cities__list">
              <li className="cities__item">
                <Button className="cities__button" onClick={handleCityClick}>
                  Москва
                </Button>
              </li>
              <li className="cities__item">
                <Button className="cities__button" onClick={handleCityClick}>
                  Санкт-Петербург
                </Button>
              </li>
            </ul>
          </div>
          <ul className="cities__list">
            {cities.map((city) => (
              <li key={city} className="cities__item">
                <Button className="cities__button" onClick={handleCityClick}>
                  {city}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Popup>
  );
};

PopupCities.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  setCity: PropTypes.func,
};

PopupCities.defaultProps = {
  isOpen: false,
  onClose: () => {},
  setCity: () => {},
};

export default PopupCities;
