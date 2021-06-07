import PropTypes from 'prop-types';
import { useState } from 'react';
import PlacesForm from '../PlacesForm/PlacesForm';
import './PlacesFormPreview.css';

const PlacesFormPreview = ({ onRecommendPlace, isPlacePopupOpened, handlePlacesFormSubmit }) => {
  const [showInputs, setShowInputs] = useState(false);
  const handleRecommendPlace = (e) => {
    e.preventDefault();
    onRecommendPlace();
    setTimeout(() => setShowInputs(!isPlacePopupOpened), 400);
  };

  return (
    <section className="recommendation recommendation_place_page">
      <div className="recommendation__texts">
        <p className="recommendation__text">
          Если вы были в интересном месте и хотите порекомендовать его другим&nbsp;наставникам
          –&nbsp;
          <a href="/" className="recommendation__text-link" onClick={handleRecommendPlace}>
            заполните&nbsp;форму
          </a>
          , и мы добавим вашу&nbsp;рекомендацию.
        </p>
      </div>
      <PlacesForm
        isPlacePopupOpened={isPlacePopupOpened}
        showInputs={showInputs}
        handlePlacesFormSubmit={handlePlacesFormSubmit}
      />
    </section>
  );
};

PlacesFormPreview.propTypes = {
  onRecommendPlace: PropTypes.func.isRequired,
  isPlacePopupOpened: PropTypes.bool.isRequired,
  handlePlacesFormSubmit: PropTypes.func,
};
PlacesFormPreview.defaultProps = {
  handlePlacesFormSubmit: () => {},
};

export default PlacesFormPreview;
