import PropTypes from 'prop-types';
import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../UI/Button/Button';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useScrollPosition from '../../hooks/useScrollPosition';
import Search from '../Cards/Search/Search';
import Navigation from '../Containers/Navigation/Navigation';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './header.css';

const Header = ({ openAuthModal, openPopupCities, onLogout }) => {
  const [search, setSearch] = useState(false);
  const [shouldBeVisible, setShouldBeVisible] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();
  const burgerRef = useRef(null);

  useOnClickOutside(burgerRef, () => setIsBurgerOpened(false));

  const handleToggleBurger = () => setIsBurgerOpened(!isBurgerOpened);

  const toggleSearch = () => {
    setSearch(!search);
    if (isBurgerOpened) {
      handleToggleBurger();
    }
  };

  const handleButtonLoginClick = () => {
    if (currentUser) {
      history.push('/personal-account');
    } else {
      openAuthModal();
    }

    if (isBurgerOpened) {
      handleToggleBurger();
    }
  };

  const openCities = () => {
    openPopupCities();
    handleToggleBurger();
  };

  const onLogoutClick = () => {
    onLogout();
    handleToggleBurger();
  };

  useScrollPosition(
    ({ previousPos, currentPos }) => {
      const isVisible = currentPos.y < previousPos.y;
      if (isVisible !== shouldBeVisible) setShouldBeVisible(isVisible);
    },
    [shouldBeVisible]
  );

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setIsBurgerOpened(false);
    });
  }, []);

  return (
    <header className={`header ${shouldBeVisible ? 'header_sticky_hide' : ''}`}>
      {!search && !isBurgerOpened ? (
        <div className="header__wrapper">
          <Link to="/" className="header__logo" />
          <Button type="button" className="header__burger-btn" onClick={handleToggleBurger}>
            &nbsp;
          </Button>

          <Navigation type="header" />

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
        ''
      )}
      {search ? (
        <Search handleClickLogin={handleButtonLoginClick} toggleSearch={toggleSearch} />
      ) : (
        ''
      )}
      {isBurgerOpened ? (
        <div className="header__wrapper" ref={burgerRef}>
          <Button className="header__button-search" onClick={toggleSearch} />
          <Button
            type="button"
            className={`header__button-login_burger header__button-login_${
              currentUser ? '' : 'un'
            }authorized`}
            onClick={handleButtonLoginClick}
            style={{ display: 'block' }}
          />
          <Link to="/" className="header__logo" />
          <Button type="button" className="header__burger-btn_close" onClick={handleToggleBurger}>
            &nbsp;
          </Button>
          <div className={`header__burger ${isBurgerOpened ? '' : 'header__burger_hidden'}`}>
            <Navigation
              type="header-burger"
              onClick={handleToggleBurger}
              currentUser={currentUser}
              openPopupCities={openCities}
              onLogout={onLogoutClick}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </header>
  );
};

Header.propTypes = {
  openAuthModal: PropTypes.func.isRequired,
  openPopupCities: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
export default Header;
