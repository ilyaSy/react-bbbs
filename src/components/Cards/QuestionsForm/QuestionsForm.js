import { useForm } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import Button from '../../UI/Button/Button';
import './QuestionsForm.css';

const QuestionsForm = ({ didAsk, onSubmit }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  return (
    <>
      <form
        className={`questions__form ${didAsk ? 'questions__form_hidden' : ''}`}
        name="ask"
        action="/"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="questions__form-heading">
          Если вы не нашли ответ на свой вопрос — напишите нам, и мы включим его в&nbsp;список
        </h3>
        <div className="questions__ask">
          <input
            className={`questions__input ${errors.questionText ? 'questions__input_error' : ''}`}
            type="text"
            {...register('question', {
              required: 'Задайте свой вопрос',
              minLength: {
                value: 2,
                message: 'Текст вопроса должен быть не менее 2 символов',
              },
            })}
            id="askme"
            placeholder={errors.questionText ? errors.questionText.message : 'Введите вопрос'}
          />
          <Button
            className="button button_color_darkgray popup__submit-btn"
            type="submit"
            disabled={!isValid}
          >
            Отправить
          </Button>
        </div>
      </form>

      <p className={`questions__result ${!didAsk ? 'questions__form_hidden' : ''}`}>
        Спасибо! Мы приняли ваш вопрос.
      </p>
    </>
  );
};

QuestionsForm.propTypes = {
  didAsk: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionsForm;
