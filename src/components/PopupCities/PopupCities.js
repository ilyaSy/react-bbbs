import PropTypes from 'prop-types';
import Popup from '../Popup/Popup';
import Button from '../Button/Button';
import { citiesGet as cities } from '../../utils/serverApiTestConfig';
import './PopupCities.css';

const PopupCities = ({ isOpen, onClose, setCityId }) => {
  const handleCityClick = (event) => {
    setCityId(event.target.id);
    onClose();
  };
  return (
    <Popup onClose={onClose} popupType="popup_type_cities" isOpen={isOpen}>
      <div className="cities">
        <h3 className="cities__heading">Выберите ваш город</h3>
        <div className="cities__cities">
          <div className="cities__capitals">
            <ul className="cities__list">
              {cities.map((city) =>
                city.isPrimary ? (
                  <li key={city.id} className="cities__item">
                    <Button id={city.id} className="cities__button" onClick={handleCityClick}>
                      {city.name}
                    </Button>
                  </li>
                ) : (
                  ''
                )
              )}
            </ul>
          </div>
          <ul className="cities__list">
            {cities.map((city) =>
              !city.isPrimary ? (
                <li key={city.id} className="cities__item">
                  <Button id={city.id} className="cities__button" onClick={handleCityClick}>
                    {city.name}
                  </Button>
                </li>
              ) : (
                ''
              )
            )}
          </ul>
        </div>
      </div>
    </Popup>
  );
};

PopupCities.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  setCityId: PropTypes.func,
};

PopupCities.defaultProps = {
  isOpen: false,
  onClose: () => {},
  setCityId: () => {},
};

export default PopupCities;
