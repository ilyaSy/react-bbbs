import PropTypes from 'prop-types';
import Button from '../Button/Button';

const PopupCitiesList = ({ cities, handleCityClick, isPrimary }) => (
  <ul className="cities__list">
    {cities.map(
      (city) =>
        city.isPrimary === isPrimary && (
          <li key={city.id} className="cities__item">
            <Button id={city.id} className="cities__button" onClick={handleCityClick}>
              {city.name}
            </Button>
          </li>
        )
    )}
  </ul>
);

PopupCitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleCityClick: PropTypes.func,
  isPrimary: PropTypes.bool.isRequired,
};

PopupCitiesList.defaultProps = {
  handleCityClick: () => {},
};

export default PopupCitiesList;
