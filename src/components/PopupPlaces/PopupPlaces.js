import { useEffect } from 'react';
import './PopupPlaces.css';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';

const PopupPlaces = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscClick = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscClick);

    return () => {
      document.removeEventListener('keydown', handleEscClick);
    };
  }, [isOpen, onClose]);

  const handleSubmit = () => {};

  return (
    <Popup popupType="popup_type_recommendation" isOpen={isOpen} onClick={onClose}>
      <div className="recommendation">
        <div className="recommendation__texts">
          <p className="recommendation__text">
            Если вы были в интересном месте и хотите порекомендовать его другим наставникам –
            <a href="/" className="recommendation__text-link recommendation__text-link_opened">
              заполните форму
            </a>
            , и мы добавим вашу&nbsp;рекомендацию.
          </p>
        </div>
        <form
          className="popup__form popup__form_type_recommendation"
          name="recommendation"
          action="#"
          method="POST"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="popup__inputs">
            <input
              type="text"
              name="name"
              placeholder="Название"
              id="name"
              className="popup__input popup__input_type_name"
              required
              minLength="2"
            />
            <input
              className="popup__input popup__input_type_url"
              type="url"
              placeholder="Сайт"
              name="date"
            />
            <input
              className="popup__input popup__input_type_address"
              type="text"
              placeholder="Адрес*"
              name="address"
            />
            <div className="popup__input popup__input_type_boy">
              <label htmlFor="boy">
                <input className="custom-radio" type="radio" name="boy" id="boy" />
                Мальчик
              </label>
            </div>
            <div className="popup__input popup__input_type_girl">
              <label htmlFor="girl">
                <input className="custom-radio" type="radio" name="girl" id="girl" />
                Девочка
              </label>
            </div>
            <input
              className="popup__input popup__input_type_age"
              type="number"
              placeholder="Возраст*"
              name="age"
            />
            <select className="popup__select popup__select_type_relax">
              <option>Активный</option>
              <option>Развлекательный</option>
              <option>Познавательный</option>
            </select>
            <textarea
              className="popup__textarea popup__textarea_type_description"
              placeholder="Комментарий*"
              name="description"
            />
            <div className="popup__feedback">
              <Button className="popup__feedback-button" type="button" />
              <p className="popup__feedback-text">Добавить&nbsp;фото</p>
            </div>
            <div className="popup__submit">
              <Button className="button button_color_darkgray popup__submit-btn" type="submit">
                Отправить
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Popup>
  );
};

// TO DO: разобраться с обработкой сабмита

PopupPlaces.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopupPlaces;
