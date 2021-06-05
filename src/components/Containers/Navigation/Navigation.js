import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import './Navigation.css';
import MenuReadWatch from '../../Modals/MenuReadWatch/MenuReadWatch';
import { pages, socialLinks } from '../../../config/config';

const Navigation = ({ type, onClick, currentUser, openPopupCities, onLogout }) => {
  let classWrapper = '';
  let classNav = '';
  let classUlPages = '';
  let classUlSocial = '';
  let classLi = '';
  let classLink = '';
  if (type === 'header') {
    classNav = 'header__menu';
    classUlPages = 'header__list';
    classLi = 'header__list-item calender-open';
    classLink = 'header__list-link';
  } else if (type === 'header-burger') {
    classWrapper = 'header__burger-wrapper';
    classNav = 'header__menu-burger';
    classUlPages = 'header__burger-list';
    classUlSocial = 'header__burger-list';
    classLi = 'header__burger-item';
    classLink = 'header__burger-link';
  } else if (type === 'footer') {
    classWrapper = 'footer__navigation';
    classNav = 'footer__menu';
    classUlPages = 'footer__list footer__list_type_nav';
    classUlSocial = 'footer__list footer__list_type_social';
    classLi = 'footer__list-item';
    classLink = 'footer__list-link';
  }
  return type === 'header' ? (
    <nav className={classNav}>
      <ul className={classUlPages}>
        {pages.map((page) => (
          <li className={classLi} key={page.url}>
            {page.url === '/read-watch' ? (
              <div className="header__menu-raw_hover">
                <Link to={page.url} className={classLink}>
                  {page.title}
                </Link>
                <MenuReadWatch />
              </div>
            ) : (
              <Link to={page.url} className={classLink}>
                {page.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  ) : (
    <div className={classWrapper}>
      <nav className={classNav}>
        <ul className={classUlPages}>
          <li className={classLi}>
            <Link to="/about" className={classLink} onClick={onClick}>
              О проекте
            </Link>
          </li>
          {pages.map((page) => (
            <li className={classLi} key={page.url}>
              <Link
                to={page.url}
                className={`${classLink} ${page.url === '/calendar' && 'calender-open'}`}
                onClick={onClick}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className={classNav}>
        <ul className={classUlSocial}>
          {socialLinks.map((social) => (
            <li className={classLi} key={social.title}>
              <a
                href={social.url}
                className={classLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClick}
              >
                {social.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {currentUser && type === 'header-burger' ? (
        <div className="burger__wrapper">
          <Button className="burger__city-btn" onClick={openPopupCities}>
            {currentUser.city
              ? `${currentUser.city}. Изменить${'\u00A0'}город`
              : 'Изменить ваш город'}
          </Button>
          <Button className="burger__city-btn" onClick={onLogout}>
            Выйти
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

Navigation.propTypes = {
  type: PropTypes.string.isRequired,
  onLogout: PropTypes.func,
  openPopupCities: PropTypes.func,
  onClick: PropTypes.func,
  currentUser: PropTypes.objectOf(PropTypes.any),
};

Navigation.defaultProps = {
  onClick: () => {},
  currentUser: {},
  onLogout: () => {},
  openPopupCities: () => {},
};

export default Navigation;
