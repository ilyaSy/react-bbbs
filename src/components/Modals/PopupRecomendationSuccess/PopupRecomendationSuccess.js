import PropTypes from 'prop-types';
import Lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import Button from '../../UI/Button/Button';
import animeJson from '../../../animations/ill_sm_1.json';
import Popup from '../Popup/Popup';
import './popupRecomendationSuccess.css';

const PopupRecomendationSuccess = ({ closeModal }) => {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animeJson,
    });
  }, []);
  return (
    <Popup className="popup popup_type_success" onClose={closeModal}>
      <div className="success">
        <Button type="button" className="popup__button-close" />
        <div ref={container} className="success__animation" />
        <h2 className="success__title success__title_type_event">
          Спасибо, мы проверим информацию, и скоро все пользователи смогут увидеть вашу рекомендацию
        </h2>
        <Button
          type="button"
          className="button button_color_black success__button"
          onClick={closeModal}
        >
          Вернуться к рекомендациям
        </Button>
      </div>
    </Popup>
  );
};
PopupRecomendationSuccess.propTypes = {
  closeModal: PropTypes.func,
};
PopupRecomendationSuccess.defaultProps = {
  closeModal: () => {},
};
export default PopupRecomendationSuccess;
