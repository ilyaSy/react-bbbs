import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
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

  const [image, setImage] = useState([]);
  const { getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const onSubmit = (placeData) => {
    const extendedPlaceData = {
      ...placeData,
      imageUrl: image[0].url,
      chosen: true,
    };

    console.log(extendedPlaceData);
    // placeData — то, что соберётся с формы;
    // extendedPlaceData — добавлен адрес картинки и атрибут,
    // указывающий, что это "выбор наставника"; вот это и пойдёт на сервер
    // (мб chosen само как-то бэкендом делается, там ещё id вроде будет)
    reset();
    onClose();
  };

  return (
    <Popup popupType="popup_type_recommendation" isOpen={isOpen} onClose={onClose}>
      <div className="recommendation">
        <div className="recommendation__texts">
          <p className="recommendation__text">
            Если вы были в интересном месте и хотите порекомендовать его другим наставникам –&nbsp;
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
                required: 'Название*',
                minLength: { value: 2, message: 'Название места должно быть не менее 2 символов' },
              })}
              type="text"
              placeholder={errors.title ? errors.title.message : 'Название*'}
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
              {...register('address', { required: 'Адрес*' })}
              type="text"
              className={`popup__input popup__input_type_address ${
                errors.address ? 'popup__input-error' : ''
              }`}
              placeholder={errors.address ? errors.address.message : 'Адрес*'}
            />
            <div className="popup__input popup__input_type_boy">
              <label htmlFor="boy" className={errors.sex ? 'popup__radio-error' : ''}>
                <input
                  className={`custom-radio ${errors.sex ? 'custom-radio-error' : ''}`}
                  type="radio"
                  value="Мальчик"
                  {...register('sex', { required: 'Мальчик' })}
                  id="boy"
                />
                Мальчик
              </label>
            </div>
            <div className="popup__input popup__input_type_girl">
              <label htmlFor="girl" className={errors.sex ? 'popup__radio-error' : ''}>
                <input
                  className={`custom-radio ${errors.sex ? 'custom-radio-error' : ''}`}
                  type="radio"
                  value="Девочка"
                  {...register('sex', { required: 'Девочка' })}
                  id="girl"
                />
                Девочка
              </label>
            </div>
            <input
              {...register('age', { required: 'Возраст*' })}
              type="number"
              className={`popup__input popup__input_type_age ${
                errors.age ? 'popup__input-error' : ''
              }`}
              placeholder={errors.age ? errors.age.message : 'Возраст*'}
            />
            <select
              {...register('type', { required: 'Тип отдыха*' })}
              className={`popup__select ${
                errors.type ? 'popup__select-error' : ''
              } popup__select_type_relax`}
            >
              <option value="">Тип отдыха*</option>
              <option value="Активный">Активный</option>
              <option value="Развлекательный">Развлекательный</option>
              <option value="Познавательный">Познавательный</option>
            </select>
            <textarea
              {...register('description', {
                required: 'Комментарий* Поделитесь впечатлениями о проведённом времени',
              })}
              className={`popup__textarea popup__textarea_type_description ${
                errors.description ? 'popup__textarea-error' : ''
              }`}
              placeholder={errors.description ? errors.description.message : 'Комментарий*'}
            />
            <div className="popup__feedback">
              <label htmlFor="addImageBtn" className="popup__feedback-text">
                <input {...getInputProps()} id="addImageBtn" className="popup__feedback-button" />
                Добавить фото
              </label>
            </div>
            <div className="popup__submit">
              <Button
                className="button button_color_darkgray popup__submit-btn"
                type="submit"
                disabled={
                  errors.title ||
                  errors.description ||
                  errors.address ||
                  errors.sex ||
                  errors.age ||
                  errors.type
                    ? 'disabled'
                    : null
                }
              >
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
