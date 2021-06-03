import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Popup from '../Popup/Popup';
import './popupError.css';

const PopupError = ({ closeModal }) => (
  <Popup onClose={closeModal}>
    <div className="calendar calendar__error">
      <Button type="button" className="button-close popup__button-close" onClick={closeModal} />
      <div className="calendar__about">
        <h2 className="calendar__event">Что-то пошло не так, попробуйте записаться снова</h2>
      </div>
      <div className="calendar__sign-up">
        <div className="calendar__sign-up_flex">
          <Button className="button button_color_black" type="button" onClick={closeModal}>
            Вернуться к мероприятию
          </Button>
        </div>
      </div>
    </div>
  </Popup>
);
PopupError.propTypes = {
  closeModal: PropTypes.func,
};
PopupError.defaultProps = {
  closeModal: () => {},
};
export default PopupError;
