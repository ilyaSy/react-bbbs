import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import successImage from '../../assets/img/success-popup.svg';
import './PopupRegisterSuccess.css';

const PopupRegisterSuccess = ({ isOpen, closeModal }) => (
  <Popup popupType={`popup_type_success ${isOpen ? 'popup_opened' : ''}`}>
    <div className="success">
      <Button type="button" className="button-close popup__button-close" onClick={closeModal} />
      <img className="success__image" src={successImage} alt="sucess" />
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

PopupRegisterSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default PopupRegisterSuccess;
