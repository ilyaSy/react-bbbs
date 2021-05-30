import PropTypes from 'prop-types';
import { useState } from 'react';
import PopupPlaces from '../PopupPlaces/PopupPlaces';
import './CreatePlace.css';

const CreatePlace = ({ onRecommendPlace, isPlacePopupOpened }) => {
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
      <PopupPlaces isPlacePopupOpened={isPlacePopupOpened} showInputs={showInputs} />
    </section>
  );
};

CreatePlace.propTypes = {
  onRecommendPlace: PropTypes.func.isRequired,
  isPlacePopupOpened: PropTypes.bool.isRequired,
};

export default CreatePlace;
