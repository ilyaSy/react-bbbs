import PropTypes from 'prop-types';
import './CreatePlace.css';

const CreatePlace = ({ onRecommendPlace }) => {
  const handleRecommendPlace = (e) => {
    e.preventDefault();
    onRecommendPlace();
  };
  return (
    <section className="recommendation recommendation_place_page">
      <div className="recommendation__texts">
        <p className="recommendation__text recommendation__text_place_page">
          Если вы были в интересном месте и хотите порекомендовать его другим&nbsp;наставникам –
          <a href="/" className="recommendation__text-link" onClick={handleRecommendPlace}>
            заполните&nbsp;форму
          </a>
          , и мы добавим вашу&nbsp;рекомендацию.
        </p>
      </div>
    </section>
  );
};

CreatePlace.propTypes = {
  onRecommendPlace: PropTypes.func.isRequired,
};

export default CreatePlace;
