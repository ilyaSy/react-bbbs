import {Link} from 'react-router-dom';

import logoSbss from '../../assets/img/logoSBSS.svg'

import {pages} from '../../config/config';
import './footer.css'

const Footer = () => {
  return(
    <footer className="footer">
      <div className="footer__wrapper">
        <a className="logo logo_place_footer" href="/">
          <img className="logo__img" src={logoSbss} alt="Логотип Старшие Братья Старшие Сестры" />
        </a>
        <a className="footer__money" href="/" target="_blank" rel="noopener">Помочь деньгами</a>
        <div className="footer__navigation">
          <nav className="footer__menu">
            <ul className="footer__list footer__list_type_nav">
              <li className="footer__list-item">
                <Link to="/about" className="footer__list-link">О проекте</Link>
              </li>
              {
                pages.map(page => (
                  <li className="footer__list-item">
                    <Link
                      key={page.url}
                      to={page.url}
                      className={`footer__list-link ${page.url === '/calendar' ? 'calender-open' : ''}`}>
                        {page.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </nav>
          <nav className="footer__menu">
            <ul className="footer__list footer__list_type_social">
              <li className="footer__list-item">
                <a href="/" className="footer__list-link" target="_blank" rel="noopener">facebook</a>
              </li>
              <li className="footer__list-item">
                <a href="/" className="footer__list-link" target="_blank" rel="noopener">vkontakte</a>
              </li>
              <li className="footer__list-item">
                <a href="/" className="footer__list-link" target="_blank" rel="noopener">instagram</a>
              </li>
              <li className="footer__list-item">
                <a href="/" className="footer__list-link" target="_blank" rel="noopener">youtube</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer__about">
          <p className="footer__copyright">&#169; Старшие Братья Старшие Сестры</p>
          <div className="footer__develop">
            <p className="footer__develop-text">
              Разработка  &mdash; студенты
              <a className="footer__develop-accent"
                 href="https://praktikum.yandex.ru/"
                 target="_blank"
                 rel="noopener">Яндекс.Практикум
              </a>
            </p>
            <p className="footer__develop-text">Концепия и дизайн &mdash;
              <a className="footer__develop-accent"
                 href="https://krkr.design/"
                 target="_blank"
                 rel="noopener">krkr.design
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
