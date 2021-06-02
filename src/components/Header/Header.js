import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { pages } from '../../config/config';
import Button from '../Button/Button';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './header.css';
import useScrollPosition from '../../utils/hooks/useScrollPosition';
import Search from '../Search/Search';
import Navigation from '../Navigation/Navigation';

const Header = ({ openAuthModal }) => {
  const [search, setSearch] = useState(false);
  const [shouldBeVisible, setShouldBeVisible] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();

  const toggleSearch = () => setSearch(!search);

  const handleButtonLoginClick = () => {
    if (currentUser) {
      history.push('/personal-account');
    } else {
      openAuthModal();
    }
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

  const handleToggleBurger = () => setIsBurgerOpened(!isBurgerOpened);

  return (
    <header className={`header ${shouldBeVisible ? 'header_sticky_hide' : ''}`}>
      {!search ? (
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
        <Search handleClickLogin={handleButtonLoginClick} toggleSearch={toggleSearch} />
      )}
      <div className={`header__burger ${isBurgerOpened ? '' : 'header__burger_hidden'}`}>
        <Navigation type="header-burger" onClick={handleToggleBurger} />
      </div>
    </header>
  );
};

Header.propTypes = {
  openAuthModal: PropTypes.func.isRequired,
};
export default Header;
