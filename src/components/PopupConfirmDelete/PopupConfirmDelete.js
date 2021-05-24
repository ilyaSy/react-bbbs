import PropTypes from 'prop-types';
import Button from '../Button/Button';

const PopupConfirmDelete = ({ place, cardId, handlerSubmitDeletePopup, isOpen, closePopup }) => {
  const handlerSubmit = (evt) => {
    evt.preventDefault();
    handlerSubmitDeletePopup(cardId);
    closePopup();
  };
  console.log(cardId);

  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <form className="popup__personal-account" onSubmit={handlerSubmit}>
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
  handlerSubmitDeletePopup: PropTypes.func,
  cardId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closePopup: PropTypes.func,
};
PopupConfirmDelete.defaultProps = {
  handlerSubmitDeletePopup: () => {},
  closePopup: () => {},
};
export default PopupConfirmDelete;
