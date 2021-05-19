import { useState, useEffect, createRef } from 'react';
import { Link } from 'react-router-dom';

import { pages, socialLinks } from '../../config/config';
import Button from '../Button/Button';
import './header.css';

const Header = () => {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const burger = createRef(null);
  const burgerBtn = createRef(null);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsBurgerOpened(false);
      }
    });

    document.addEventListener('click', (e) => {
      console.log(e);
      // if (e.target !== burger && e.target !== burgerBtn) {
      //   setIsBurgerOpened(false)
      // }
    });
  }, []);

  const handleToggleBurger = () => {
    setIsBurgerOpened(!isBurgerOpened);
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo" />
        <Button
          ref={burgerBtn}
          type="button"
          className="header__burger-btn"
          onClick={handleToggleBurger}
        />
        <nav className="header__menu">
          <ul className="header__list">
            {pages.map((page) => (
              <li className="header__list-item calender-open" key={page.url}>
                <Link to={page.url} className="header__list-link">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="header__action">
          <Link className="header__button-search" to="/" />
          <Button
            type="button"
            className="header__button-login header__button-login_unauthorized"
          />
        </nav>
      </div>
      <div
        ref={burger}
        className={`header__burger ${isBurgerOpened ? '' : 'header__burger_hidden'}`}
      >
        <div className="header__burger-wrapper">
          <nav className="header__menu-burger">
            <ul className="header__burger-list">
              <li className="header__burger-item">
                <Link to="/about" className="header__burger-link">
                  О проекте
                </Link>
              </li>
              {pages.map((page) => (
                <li className="header__burger-item" key={page.url}>
                  <Link
                    to={page.url}
                    className={`header__burger-link ${
                      page.url === '/calendar' ? 'calender-open' : ''
                    }`}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="header__menu-burger">
            <ul className="header__burger-list">
              {socialLinks.map((social) => (
                <li className="header__burger-item" key={social.title}>
                  <a
                    href={social.url}
                    className="header__burger-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
