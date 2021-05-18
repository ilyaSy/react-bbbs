import {Link} from 'react-router-dom';

import {pages} from '../../config/config';
import './header.css'

const Header = () => {
  return(
    <header className="header">
      <div className="header__wrapper">
        <a className="header__logo" href="/" />
        <button type="button" className="header__burger-btn" />
        <nav className="header__menu">
          <ul className="header__list">
            {pages.map((page) => (
              <li className="header__list-item calender-open" key={page.url}>
                <Link
                  to={page.url}
                  className="header__list-link"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="header__action">
          <a className="header__button-search" href="/" />
          <button type="button" className="header__button-login header__button-login_unauthorized" />
        </nav>
      </div>
      <div className="header__burger header__burger_hidden">
        <div className="header__burger-wrapper">
          <nav className="header__menu-burger">
            <ul className="header__burger-list">
              <li className="header__burger-item">
                <a href="/" className="header__burger-link">О проекте</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link calender-open">Календарь</a>
                <a href="/" className="header__burger-link">О проекте</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link calender-open">Календарь</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link">Куда пойти</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link">Вопросы</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link">Читать и смотреть</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link">Права детей</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link">Истории</a>
                <a href="/" className="header__burger-link">Права детей</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link">Истории</a>
              </li>
            </ul>
          </nav>
          <nav className="header__menu-burger">
            <ul className="header__burger-list">
              <li className="header__burger-item">
                <a href="/" className="header__burger-link" target="_blank" rel="noopener">facebook</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link" target="_blank" rel="noopener">vkontakte</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link" target="_blank" rel="noopener">instagram</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link" target="_blank" rel="noopener">youtube</a>
                <a href="/" className="header__burger-link" target="_blank" rel="noopener">facebook</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link" target="_blank" rel="noopener">vkontakte</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link" target="_blank" rel="noopener">instagram</a>
              </li>
              <li className="header__burger-item">
                <a href="/" className="header__burger-link" target="_blank" rel="noopener">youtube</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
