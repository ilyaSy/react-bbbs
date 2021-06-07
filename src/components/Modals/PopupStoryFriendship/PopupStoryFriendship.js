import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import Button from '../../UI/Button/Button';

const PopupStoryFriendship = ({
  closePopup,
  currentCardStory,
  postStoriesData,
  updateStoriesData,
}) => {
  const mode = currentCardStory ? 'edit' : 'add';

  const currentPlace = currentCardStory?.place || '';
  const currentText = currentCardStory?.text || '';
  const currentDate = currentCardStory?.date || '';
  const currentFeedback = currentCardStory?.feedback || '';
  const currentImage = currentCardStory?.image || '';
  // Данные конкретной  карточки для редактирования

  const [feedback, setFeedback] = useState(currentFeedback);
  //  Добавляем картинку currentCardStory.image
  const [image, setImage] = useState(currentImage ? [{ preview: currentImage }] : []);
  const { getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  // форма
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleToggleFeedback = (event) => {
    setFeedback(event.target.value);
  };
  const onSubmit = (data) => {
    if (mode === 'add') {
      postStoriesData(data);
      // Пока нет бека картинка отправляется дефолтная
    } else if (mode === 'edit') {
      updateStoriesData({ ...data, id: currentCardStory.id, image: currentCardStory.image });
    }
  };
  return (
    <>
      <h2 className="personal-account__title personal-account__title_type_content">
        Составьте историю вашей дружбы с младшим. Эта страница доступна только вам.
      </h2>

      <form
        className="personal-account__form"
        name="addFreanshipHistory"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="personal-account__photo">
          <input
            {...getInputProps()}
            id="personal-account__photo-add2"
            className="personal-account__button"
          />
          {!image[0] && (
            <label htmlFor="personal-account__photo-add2" className="personal-account__photo-text">
              Загрузить фото{false}
            </label>
          )}
          {image[0] && (
            <img className="personal-account__photo-opened" src={image[0].preview} alt="картинка" />
          )}
        </div>
        <div className="personal-account__inputs">
          <input
            id="place"
            type="text"
            placeholder={errors.place ? errors.place.message : 'Место встречи'}
            {...register('place', {
              required: 'Место встречи*',
            })}
            className={`personal-account__input personal-account__input_type_place ${
              errors.place ? 'personal-account__input-error' : ''
            }`}
            defaultValue={currentPlace}
          />
          <input
            className="personal-account__input personal-account__input_type_date"
            type="text"
            {...register('date', {
              required: 'дата*',
            })}
            defaultValue={currentDate}
            placeholder={`Дата ${'\u0020'}${'\uFF3F'}.${'\uFF3F'}.${'\uFF3F'}${'\uFF3F'}`}
            onFocus={(e) => {
              e.currentTarget.type = 'date';
              e.currentTarget.focus();
            }}
            onBlur={(e) => {
              e.currentTarget.type = 'text';
            }}
          />
          <textarea
            className={`personal-account__textarea personal-account__textarea_type_description ${
              errors.description ? 'personal-account__input-error' : ''
            }`}
            placeholder="Опишите вашу встречу, какие чувства вы испытывали, что понравилось / не понравилось"
            {...register('text', {
              required:
                'Опишите вашу встречу, какие чувства вы испытывали, что понравилось / не понравилось*',
            })}
            defaultValue={currentText}
          />
          <div className="personal-account__feedback">
            <label
              htmlFor="good"
              className={`personal-account__label personal-account__feedback-button personal-account__feedback-button_good ${
                feedback === 'good' && 'personal-account__feedback-button_good-active'
              }`}
            >
              <input
                className="personal-account__radio"
                type="radio"
                id="good"
                {...register('feedback', {
                  required: 'Фидбек',
                })}
                value="good"
                checked={feedback === 'good'}
                onChange={handleToggleFeedback}
              />
            </label>

            <label
              htmlFor="normal"
              className={`personal-account__label personal-account__feedback-button personal-account__feedback-button_normal ${
                feedback === 'normal' && 'personal-account__feedback-button_normal-active'
              }`}
            >
              <input
                className="personal-account__radio"
                type="radio"
                id="normal"
                {...register('feedback', {
                  required: 'Фидбек',
                })}
                value="normal"
                checked={feedback === 'normal'}
                onChange={handleToggleFeedback}
              />
            </label>

            <label
              htmlFor="bad"
              className={`personal-account__label personal-account__feedback-button personal-account__feedback-button_bad ${
                feedback === 'bad' && 'personal-account__feedback-button_bad-active'
              }`}
            >
              <input
                className="personal-account__radio"
                type="radio"
                id="bad"
                {...register('feedback', {
                  required: 'Фидбек',
                })}
                value="bad"
                checked={feedback === 'bad'}
                onChange={handleToggleFeedback}
              />
            </label>
            <p className="personal-account__feedback-text">Оцените проведенное время</p>
          </div>
          <div className="personal-account__submit">
            <Button className="personal-account__feedback-btn" onClick={closePopup}>
              {mode === 'add' ? 'Удалить' : 'Отмена'}
            </Button>
            <Button
              className="button"
              type="submit"
              disabled={errors.place || errors.description || errors.date ? 'disabled' : null}
            >
              {mode === 'add' ? 'Добавить' : 'Сохранить'}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
PopupStoryFriendship.propTypes = {
  closePopup: PropTypes.func.isRequired,
  postStoriesData: PropTypes.func.isRequired,
  updateStoriesData: PropTypes.func.isRequired,
  currentCardStory: PropTypes.objectOf(PropTypes.any),
};
PopupStoryFriendship.defaultProps = {
  currentCardStory: null,
};
export default PopupStoryFriendship;
