import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import Button from '../Button/Button';

const PopupStoryFriendship = ({ closePopup, storiesData, setStoriesData }) => {
  const [feedback, setFeedback] = useState('');
  //  Добавляем картинку
  const [image, setImage] = useState([]);
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
    const newArr = [...storiesData];
    newArr.push({
      ...data,
      image: image[0].preview,
    });
    setStoriesData(newArr);
    closePopup();
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
          <label htmlFor="personal-account__photo-add2" className="personal-account__photo-text">
            Загрузить фото
            {image[0] && (
              <img
                className="personal-account__photo-opened"
                src={image[0].preview}
                alt="картинка"
              />
            )}
          </label>
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
          />
          <input
            className="personal-account__input personal-account__input_type_date"
            type="date"
            {...register('date', {
              required: 'дата*',
            })}
          />
          <textarea
            className="personal-account__textarea personal-account__textarea_type_description"
            placeholder="Опишите вашу встречу, какие чувства вы испытывали, что понравилось / не понравилось"
            {...register('description', {
              required:
                'Опишите вашу встречу, какие чувства вы испытывали, что понравилось / не понравилось*',
            })}
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
                onChange={handleToggleFeedback}
              />
            </label>
            <p className="personal-account__feedback-text">Оцените проведенное время</p>
          </div>
          <div className="personal-account__submit">
            <Button className="personal-account__feedback-btn" onClick={closePopup}>
              Удалить
            </Button>
            <Button className="button button_color_black-nonactive" type="submit">
              Добавить
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
PopupStoryFriendship.propTypes = {
  closePopup: PropTypes.func,
  storiesData: PropTypes.arrayOf(PropTypes.any),
  setStoriesData: PropTypes.func,
};
PopupStoryFriendship.defaultProps = {
  closePopup: () => {},
  storiesData: [],
  setStoriesData: () => {},
};
export default PopupStoryFriendship;
