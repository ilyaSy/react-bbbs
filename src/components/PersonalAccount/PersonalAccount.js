/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from '../Button/Button';
import './PersonalAccount.css';

const PersonalAccount = () => (
  <section className="personal-account content">
    <div className="personal-account__buttons">
      <Button className="personal-account__feedback-btn personal-account__text">
        Изменить ваш город
      </Button>
      <Button className="personal-account__feedback-btn personal-account__text">Выйти</Button>
    </div>
    <div className="personal-account__events">
      <h2 className="personal-account__title">У вас нет записи на мероприятия</h2>
    </div>
    <h2 className="personal-account__title personal-account__title_type_content">
      Составьте историю вашей дружбы с младшим. Эта страница доступна только вам.
    </h2>

    <form className="personal-account__form">
      <div className="personal-account__photo">
        <input id="personal-account__photo-add2" className="personal-account__button" type="file" />
        <label htmlFor="personal-account__photo-add2" className="personal-account__photo-text">
          Загрузить фото
        </label>
      </div>
      <div className="personal-account__inputs">
        <input
          className="personal-account__input personal-account__input_type_place"
          type="text"
          placeholder="Место встречи"
          name="place"
        />
        <input
          className="personal-account__input personal-account__input_type_date"
          type="date"
          name="date"
        />
        <textarea
          className="personal-account__textarea personal-account__textarea_type_description"
          placeholder="Опишите вашу встречу, какие чувства вы испытывали, что понравилось / не понравилось"
          name="description"
        />
        <div className="personal-account__feedback">
          <input
            className="personal-account__radio"
            type="radio"
            id="good"
            name="feedback"
            value="good"
          />
          <label
            htmlFor="good"
            className="personal-account__label personal-account__feedback-button personal-account__feedback-button_good"
          />
          <input
            className="personal-account__radio"
            type="radio"
            id="normal"
            name="feedback"
            value="normal"
          />
          <label
            htmlFor="normal"
            className="personal-account__label personal-account__feedback-button personal-account__feedback-button_normal"
          />
          <input
            className="personal-account__radio"
            type="radio"
            id="bad"
            name="feedback"
            value="bad"
          />
          <label
            htmlFor="bad"
            className="personal-account__label personal-account__feedback-button personal-account__feedback-button_bad"
          />
          <p className="personal-account__feedback-text">Оцените проведенное время</p>
        </div>
        <div className="personal-account__submit">
          <Button className="personal-account__feedback-btn">Удалить</Button>
          <Button className="button button_color_black-nonactive" type="submit">
            Добавить
          </Button>
        </div>
      </div>
    </form>
  </section>
);
export default PersonalAccount;
