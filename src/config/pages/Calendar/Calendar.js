import Button from "../../../components/Button/Button";
import './Calendar.css'
const Calendar = () => {
  return(
    <section className="grid-calendar content">
      <h1 className="heading">Календарь</h1>
      <div className="grid-calendar__buttons">
        <Button className="button button_color_black" type="button">Декабрь</Button>
        <Button className="button button_color_black" type="button">Январь</Button>
        <Button className="button button_color_black" type="button">Февраль</Button>
      </div>
      <div className="grid-calendar__grid">
        <div className="calendar calendar_onclick">
          <div className="calendar__about">
            <p className="calendar__participants">Волонтёры + дети</p>
            <p className="calendar__date">декабрь / понедельник</p>
            <h2 className="calendar__event">Субботний meet up: учимся проходить интевью</h2>
            <p className="calendar__day">05</p>
          </div>
          <ul className="calendar__contacts">
            <li className="calendar__contacts-item">
              <p className="calendar__time">12:00–14:00</p>
            </li>
            <li className="calendar__contacts-item">
              <p className="calendar__adress">Садовническая наб., д. 77 стр. 1 (офис компании Ernst&Young)</p>
            </li>
            <li className="calendar__contacts-item">
              <p className="calendar__phone">Александра, +7 926 356-78-90</p>
            </li>
          </ul>
          <div className="calendar__sign-up">
            <div className="calendar__sign-up_flex">
              <Button
                className="button button_color_blue button_color_blue_onclick button_color_blue-open"
                type="button">Отменить
                запись
              </Button>
              <p className="calendar__sign-up__type_text">Осталось 5 мест</p>
            </div>
            <Button className="button_color_blue button_color_blue-round button_color_blue-open"
                    type="button">
              <svg className="calendar__btn" viewBox="0 0 40 40" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19.5" stroke="#224CFF"/>
                <circle cx="13.3346" cy="20.0002" r="1.66667" fill="#224CFF"/>
                <circle cx="20.0026" cy="19.9999" r="1.66667" fill="#224CFF"/>
                <circle cx="26.6667" cy="19.9999" r="1.66667" fill="#224CFF"/>
              </svg>
            </Button>
          </div>
        </div>

        <div className="calendar">
          <div className="calendar__about">
            <p className="calendar__participants">Волонтёры</p>
            <p className="calendar__date">декабрь / понедельник</p>
            <h2 className="calendar__event">Ресурсная группа «Вовлечение в волонтёрство»</h2>
            <p className="calendar__day">16</p>
          </div>
          <ul className="calendar__contacts">
            <li className="calendar__contacts-item">
              <p className="calendar__time">12:00–14:00</p>
            </li>
            <li className="calendar__contacts-item">
              <p className="calendar__adress">Садовническая наб., д. 77 стр. 1 (офис компании Ernst&Young)</p>
            </li>
            <li className="calendar__contacts-item">
              <p className="calendar__phone">Александра, +7 926 356-78-90</p>
            </li>
          </ul>
          <div className="calendar__sign-up">
            <div className="calendar__sign-up_flex">
              <Button className="button button_color_blue button_color_blue-nonactive" type="button"
                      disabled="disabled">Записаться
              </Button>
              <p className="calendar__sign-up__type_text">Запись закрыта</p>
            </div>
            <Button className="button_color_blue button_color_blue-round button_color_blue-open"
                    type="button">
              <svg className="calendar__btn" viewBox="0 0 40 40" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19.5" stroke="#224CFF"/>
                <circle cx="13.3346" cy="20.0002" r="1.66667" fill="#224CFF"/>
                <circle cx="20.0026" cy="19.9999" r="1.66667" fill="#224CFF"/>
                <circle cx="26.6667" cy="19.9999" r="1.66667" fill="#224CFF"/>
              </svg>
            </Button>
          </div>
        </div>

        <div className="calendar">
          <div className="calendar__about">
            <p className="calendar__participants">Волонтёры + дети</p>
            <p className="calendar__date">декабрь / понедельник</p>
            <h2 className="calendar__event">Занятие с выпускниками: как составить резюме</h2>
            <p className="calendar__day">20</p>
          </div>
          <ul className="calendar__contacts">
            <li className="calendar__contacts-item">
              <p className="calendar__time">12:00–14:00</p>
            </li>
            <li className="calendar__contacts-item">
              <p className="calendar__adress">Садовническая наб., д. 77 стр. 1 (офис компании Ernst&Young)</p>
            </li>
            <li className="calendar__contacts-item">
              <p className="calendar__phone">Александра, +7 926 356-78-90</p>
            </li>
          </ul>
          <div className="calendar__sign-up">
            <div className="calendar__sign-up_flex">
              <button className="button button_color_blue button_color_blue-open"
                      type="button">Записаться
              </button>
              <p className="calendar__sign-up__type_text">Осталось 5 мест</p>
            </div>
            <button className="button_color_blue button_color_blue-round button_color_blue-open"
                    type="button">
              <svg className="calendar__btn" viewBox="0 0 40 40" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19.5" stroke="#224CFF"/>
                <circle cx="13.3346" cy="20.0002" r="1.66667" fill="#224CFF"/>
                <circle cx="20.0026" cy="19.9999" r="1.66667" fill="#224CFF"/>
                <circle cx="26.6667" cy="19.9999" r="1.66667" fill="#224CFF"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="calendar">
          <div className="calendar__about">
            <p className="calendar__participants">Волонтёры + дети</p>
            <p className="calendar__date">декабрь / понедельник</p>
            <h2 className="calendar__event">Субботний meet up: учимся проходить интевью</h2>
            <p className="calendar__day">23</p>
          </div>
          <ul className="calendar__contacts">
            <li className="calendar__contacts-item">
              <p className="calendar__time">12:00–14:00</p>
            </li>
            <li className="calendar__contacts-item">
              <p className="calendar__adress">Садовническая наб., д. 77 стр. 1 (офис компании Ernst&Young)</p>
            </li>
            <li className="calendar__contacts-item">
              <p className="calendar__phone">Александра, +7 926 356-78-90</p>
            </li>
          </ul>
          <div className="calendar__sign-up">
            <div className="calendar__sign-up_flex">
              <button className="button button_color_blue button_color_blue-open"
                      type="button">Записаться
              </button>
              <p className="calendar__sign-up__type_text">Осталось 5 мест</p>
            </div>
            <button className="button_color_blue button_color_blue-round button_color_blue-open"
                    type="button">
              <svg className="calendar__btn" viewBox="0 0 40 40" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19.5" stroke="#224CFF"/>
                <circle cx="13.3346" cy="20.0002" r="1.66667" fill="#224CFF"/>
                <circle cx="20.0026" cy="19.9999" r="1.66667" fill="#224CFF"/>
                <circle cx="26.6667" cy="19.9999" r="1.66667" fill="#224CFF"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="calendar">
          <div className="calendar__about">
            <p className="calendar__participants">Волонтёры + дети</p>
            <p className="calendar__date">декабрь / понедельник</p>
            <h2 className="calendar__event">Субботний meet up: учимся проходить интевью</h2>
            <p className="calendar__day">28</p>
          </div>
          <ul className="calendar__contacts">
            <li className="calendar__contacts-item">
              <p className="calendar__time">12:00–14:00</p>
            </li>
            <li className="calendar__contacts-item">
              <p className="calendar__adress">Садовническая наб., д. 77 стр. 1 (офис компании Ernst&Young)</p>
            </li>
            <li className="calendar__contacts-item">
              <p className="calendar__phone">Александра, +7 926 356-78-90</p>
            </li>
          </ul>
          <div className="calendar__sign-up">
            <div className="calendar__sign-up_flex">
              <button className="button button_color_blue button_color_blue-open"
                      type="button">Записаться
              </button>
              <p className="calendar__sign-up__type_text">Осталось 5 мест</p>
            </div>
            <button className="button_color_blue button_color_blue-round button_pcolor_blue-open"
                    type="button">
              <svg className="calendar__btn" viewBox="0 0 40 40" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19.5" stroke="#224CFF"/>
                <circle cx="13.3346" cy="20.0002" r="1.66667" fill="#224CFF"/>
                <circle cx="20.0026" cy="19.9999" r="1.66667" fill="#224CFF"/>
                <circle cx="26.6667" cy="19.9999" r="1.66667" fill="#224CFF"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Calendar
