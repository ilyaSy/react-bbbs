import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import format from '../../utils/format';
import './PopupConfirmRegister.css';

const PopupConfirmRegister = ({
  selectedConfirmCalendarCard,
  isOpen,
  closeModal,
  handlerConfirmRegisterSubmit,
}) => {
  const { title, startAt = '', endAt = '' } = selectedConfirmCalendarCard || {};

  const startAtDate = new Date(startAt);
  const endAtDate = new Date(endAt);

  const day = !startAt || format(startAtDate, 'dd');
  const startTime = !startAt || format(startAtDate, 'KK:mm');
  const endTime = !endAt || format(endAtDate, 'KK:mm');
  const monthName = !startAt || format(startAtDate, 'MMMM');

  const handlerSubmit = (evt) => {
    evt.preventDefault();
    handlerConfirmRegisterSubmit(selectedConfirmCalendarCard);
  };
  return (
    <Popup popupType={`popup__proof ${isOpen ? 'popup_opened' : ''}`}>
      <form className="proof" onSubmit={handlerSubmit}>
        <Button type="button" className="button-close popup__button-close" onClick={closeModal} />
        <h2 className="proof__title">Подтвердить запись на мероприятие</h2>
        <p className="proof__subtitle">
          &laquo;{title}&raquo; {day} {monthName} с&nbsp;{startTime}-{endTime}
        </p>
        <div className="proof__buttons">
          <Button type="submit" className="proof__sbm-btn button button_color_blue">
            Подтвердить запись
          </Button>
          <Button
            type="button"
            className="proof__cancel-btn button button_color_black"
            onClick={closeModal}
          >
            Отменить
          </Button>
        </div>
      </form>
    </Popup>
  );
};

PopupConfirmRegister.propTypes = {
  selectedConfirmCalendarCard: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handlerConfirmRegisterSubmit: PropTypes.func.isRequired,
};
export default PopupConfirmRegister;
