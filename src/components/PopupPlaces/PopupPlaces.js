import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './PopupPlaces.css';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';

const PopupPlaces = ({ isOpen, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (placeData) => {
    console.log(placeData);
    // placeData — то, что соберётся с формы; эти данные и пойдут на сервер
    reset();
    onClose();
  };

  // TO DO: перенести обработку клика по esc и оверлею в компонент Popup

  useEffect(() => {
    const handleEscClick = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscClick);

    return () => {
      document.removeEventListener('keydown', handleEscClick);
    };
  }, [isOpen, onClose]);

  return (
    <Popup popupType="popup_type_recommendation" isOpen={isOpen} onClose={onClose}>
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="popup__inputs">
            <input
              {...register('title', {
                required: 'Введите название места',
                minLength: { value: 2, message: 'Название места должно быть не менее 2 символов' },
              })}
              type="text"
              placeholder={errors.title ? errors.title.message : 'Название места*'}
              className={`popup__input popup__input_type_name ${
                errors.title ? 'popup__input-error' : ''
              }`}
            />
            <input
              {...register('link')}
              type="url"
              className={`popup__input popup__input_type_url ${
                errors.link ? 'popup__input-error' : ''
              }`}
              placeholder={errors.link ? errors.link.message : 'Сайт'}
            />
            <input
              {...register('address', { required: 'Введите адрес' })}
              type="text"
              className={`popup__input popup__input_type_address ${
                errors.address ? 'popup__input-error' : ''
              }`}
              placeholder={errors.address ? errors.address.message : 'Адрес*'}
            />
            <div className="popup__input popup__input_type_boy">
              <label htmlFor="boy">
                <input
                  className="custom-radio"
                  type="radio"
                  value="Мальчик"
                  {...register('sex')}
                  id="boy"
                />
                Мальчик
              </label>
            </div>
            <div className="popup__input popup__input_type_girl">
              <label htmlFor="girl">
                <input
                  className="custom-radio"
                  type="radio"
                  value="Девочка"
                  {...register('sex')}
                  id="girl"
                />
                Девочка
              </label>
            </div>
            <input
              {...register('age', { required: 'Введите возраст младшего' })}
              type="number"
              className={`popup__input popup__input_type_age ${
                errors.age ? 'popup__input-error' : ''
              }`}
              placeholder={errors.age ? errors.age.message : 'Возраст*'}
            />
            <select className="popup__select popup__select_type_relax" {...register('type')}>
              <option>Активный</option>
              <option>Развлекательный</option>
              <option>Познавательный</option>
            </select>
            <textarea
              {...register('description', {
                required: 'Расскажите о ваших с младшим впечатлениях',
              })}
              className={`popup__textarea popup__textarea_type_description ${
                errors.description ? 'popup__textarea-error' : ''
              }`}
              placeholder={errors.description ? errors.description.message : 'Комментарий*'}
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

PopupPlaces.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopupPlaces;
