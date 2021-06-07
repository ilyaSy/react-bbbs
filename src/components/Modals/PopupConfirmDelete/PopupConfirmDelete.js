import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';

const PopupConfirmDelete = ({ place, cardId, handleSubmitDeletePopup, isOpen, closePopup }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSubmitDeletePopup(cardId);
    closePopup();
  };

  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <form className="popup__personal-account" onSubmit={handleSubmit}>
        <h2 className="popup__title">Удалить {place}?</h2>
        <div className="popup__buttons">
          <Button type="submit" className="button">
            Удалить
          </Button>
          <Button type="button" className="button button_color_black" onClick={closePopup}>
            Отмена
          </Button>
        </div>
      </form>
    </section>
  );
};
PopupConfirmDelete.propTypes = {
  place: PropTypes.string.isRequired,
  handleSubmitDeletePopup: PropTypes.func,
  cardId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool,
  closePopup: PropTypes.func,
};
PopupConfirmDelete.defaultProps = {
  handleSubmitDeletePopup: () => {},
  closePopup: () => {},
  isOpen: false,
};
export default PopupConfirmDelete;
