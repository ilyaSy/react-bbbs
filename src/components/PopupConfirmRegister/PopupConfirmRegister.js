import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import './PopupConfirmRegister.css';

const PopupConfirmRegister = ({ isOpen, closeModal, handlerConfirmRegisterSubmit }) => {
  const handlerSubmit = (evt) => {
    evt.preventDefault();
    handlerConfirmRegisterSubmit();
  };
  return (
    <Popup popupType={`popup__proof ${isOpen ? 'popup_opened' : ''}`}>
      <div className="proof">
        <Button type="button" className="button-close popup__button-close" onClick={closeModal} />
        <h2 className="proof__title">Подтвердить запись на мероприятие</h2>
        <p className="proof__subtitle">
          «Субботний meet up: учимся проходить интервью» 5 декабря с&nbsp;12:00–14:00
        </p>
        <div className="proof__buttons">
          <Button
            type="submit"
            className="proof__sbm-btn button button_color_blue"
            onClick={handlerSubmit}
          >
            Подтвердить запись
          </Button>
          <Button type="submit" className="proof__cancel-btn button button_color_black">
            Отменить
          </Button>
        </div>
      </div>
    </Popup>
  );
};

PopupConfirmRegister.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handlerConfirmRegisterSubmit: PropTypes.func.isRequired,
};
export default PopupConfirmRegister;
