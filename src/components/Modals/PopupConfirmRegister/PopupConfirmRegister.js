import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Popup from '../Popup/Popup';
import formatDate from '../../../utils/formatDate';
import './PopupConfirmRegister.css';

const PopupConfirmRegister = ({
  selectedConfirmCalendarCard,
  closeModal,
  handleConfirmRegisterSubmit,
}) => {
  const { title, startAt = '', endAt = '' } = selectedConfirmCalendarCard || {};

  const startAtDate = new Date(startAt);
  const endAtDate = new Date(endAt);

  const day = !startAt || formatDate(startAtDate, 'dd');
  const startTime = !startAt || formatDate(startAtDate, 'KK:mm');
  const endTime = !endAt || formatDate(endAtDate, 'KK:mm');
  const monthName = !startAt || formatDate(startAtDate, 'MMMM');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleConfirmRegisterSubmit(selectedConfirmCalendarCard);
  };
  return (
    <Popup popupType="popup__proof" onClose={closeModal}>
      <form className="proof" onSubmit={handleSubmit}>
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
  ),
  closeModal: PropTypes.func.isRequired,
  handleConfirmRegisterSubmit: PropTypes.func.isRequired,
};
PopupConfirmRegister.defaultProps = {
  selectedConfirmCalendarCard: {},
};
export default PopupConfirmRegister;
