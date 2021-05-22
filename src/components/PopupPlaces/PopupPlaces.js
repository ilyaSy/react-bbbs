import './PopupPlaces.css';

const PopupPlaces = () => (
  <div className="popup popup_type_recommendation">
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
            <button
              className="popup__feedback-button"
              type="button"
              name="good"
              aria-label="Добавить фото"
            />
            <p className="popup__feedback-text">Добавить&nbsp;фото</p>
          </div>
          <div className="popup__submit">
            <button className="button button_color_darkgray popup__submit-btn" type="submit">
              Отправить
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default PopupPlaces;
