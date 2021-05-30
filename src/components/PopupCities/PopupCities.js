import PropTypes from 'prop-types';
import Popup from '../Popup/Popup';
import Button from '../Button/Button';
import './PopupCities.css';

const PopupCities = ({ onClose, updateCity, cities }) => {
  const handleCityClick = (event) => {
    updateCity(event.target.textContent);
    onClose();
  };
  return (
    <Popup onClose={onClose} popupType="popup_type_cities">
      <div className="cities">
        <h3 className="cities__heading">Выберите ваш город</h3>
        <div className="cities__cities">
          <div className="cities__capitals">
            <ul className="cities__list">
              {cities.map(
                (city) =>
                  city.isPrimary && (
                    <li key={city.id} className="cities__item">
                      <Button className="cities__button" onClick={handleCityClick}>
                        {city.name}
                      </Button>
                    </li>
                  )
              )}
            </ul>
          </div>
          <ul className="cities__list">
            {cities.map(
              (city) =>
                !city.isPrimary && (
                  <li key={city.id} className="cities__item">
                    <Button className="cities__button" onClick={handleCityClick}>
                      {city.name}
                    </Button>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </Popup>
  );
};

PopupCities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,
  updateCity: PropTypes.func,
};

PopupCities.defaultProps = {
  onClose: () => {},
  updateCity: () => {},
};

export default PopupCities;
