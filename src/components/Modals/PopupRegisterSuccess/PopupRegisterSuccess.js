import PropTypes from 'prop-types';
import Lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import Button from '../../UI/Button/Button';
import Popup from '../Popup/Popup';
import './PopupRegisterSuccess.css';
import animeJson from '../../../animations/ill_sm_2.json';

const PopupRegisterSuccess = ({ closeModal }) => {
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
    <Popup popupType="popup_type_success" onClose={closeModal}>
      <div className="success">
        <Button type="button" className="button-close popup__button-close" onClick={closeModal} />
        <div ref={container} className="success__animation" />
        <h2 className="success__title">Вы записаны на мероприятие</h2>
        <p className="success__subtitle">
          «Субботний meet up: учимся проходить интервью» 5 декабря с&nbsp;12:00–14:00
        </p>
        <h2 className="success__title">
          {' '}
          Если у вас не получится прийти — отмените, пожалуйста, запись.
        </h2>
        <Button
          type="button"
          className="button button_color_black success__button"
          onClick={closeModal}
        >
          Вернуться к календарю
        </Button>
      </div>
    </Popup>
  );
};

PopupRegisterSuccess.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
export default PopupRegisterSuccess;
