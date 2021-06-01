import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { pages, socialLinks } from '../../config/config';
import Button from '../Button/Button';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './header.css';
import useScrollPosition from '../../utils/hooks/useScrollPosition';
import Search from '../Search/Search';

const Header = ({ openAuthModal }) => {
  const [search, setSearch] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();

  const toggleSearch = () => {
    setSearch(!search);
  };

  const handleButtonLoginClick = () => {
    if (currentUser) {
      history.push('/personal-account');
    } else {
      openAuthModal();
    }
  };

  const [shouldBeVisible, setShouldBeVisible] = useState(false);

  useScrollPosition(
    ({ previousPos, currentPos }) => {
      const isVisible = currentPos.y < previousPos.y;
      if (isVisible !== shouldBeVisible) setShouldBeVisible(isVisible);
    },
    [shouldBeVisible]
  );

  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsBurgerOpened(false);
      }
    });
  }, []);

  const handleToggleBurger = () => {
    setIsBurgerOpened(!isBurgerOpened);
  };

  return (
    <header className={`header ${shouldBeVisible ? 'header_sticky_hide' : ''}`}>
      {!search ? (
        <div className="header__wrapper">
          <Link to="/" className="header__logo" />
          <Button type="button" className="header__burger-btn" onClick={handleToggleBurger}>
            &nbsp;
          </Button>
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
            <Button className="header__button-search" onClick={toggleSearch} />
            <Button
              type="button"
              className={`header__button-login header__button-login_${
                currentUser ? '' : 'un'
              }authorized`}
              onClick={handleButtonLoginClick}
            />
          </nav>
        </div>
      ) : (
        <Search handleClickLogin={handleButtonLoginClick} toggleSearch={toggleSearch} />
      )}
      <div className={`header__burger ${isBurgerOpened ? '' : 'header__burger_hidden'}`}>
        <div className="header__burger-wrapper">
          <nav className="header__menu-burger">
            <ul className="header__burger-list">
              <li className="header__burger-item">
                <Link to="/about" className="header__burger-link" onClick={handleToggleBurger}>
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
                    onClick={handleToggleBurger}
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
                    onClick={handleToggleBurger}
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

Header.propTypes = {
  openAuthModal: PropTypes.func.isRequired,
};
export default Header;
