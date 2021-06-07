import PropTypes from 'prop-types';
import Popup from '../Popup/Popup';
import PopupCitiesList from '../../UI/PopupCitiesList/PopupCitiesList';
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
            <PopupCitiesList cities={cities} isPrimary handleCityClick={handleCityClick} />
          </div>
          <PopupCitiesList cities={cities} isPrimary={false} handleCityClick={handleCityClick} />
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
