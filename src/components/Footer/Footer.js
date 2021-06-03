import logoSbss from '../../assets/img/logoSBSS.svg';

import Navigation from '../Containers/Navigation/Navigation';
import './footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__wrapper">
      <a className="logo logo_place_footer" href="/">
        <img className="logo__img" src={logoSbss} alt="Логотип Старшие Братья Старшие Сестры" />
      </a>
      <a
        className="footer__money"
        href="https://www.nastavniki.org/campaign/pomoch-dengami/"
        target="_blank"
        rel="noreferrer noopener"
      >
        Помочь деньгами
      </a>

      <Navigation type="footer" />

      <div className="footer__about">
        <p className="footer__copyright">&#169; Старшие Братья Старшие Сестры</p>
        <div className="footer__develop">
          <p className="footer__develop-text">
            Разработка &mdash; студенты&nbsp;
            <a
              className="footer__develop-accent"
              href="https://praktikum.yandex.ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </p>
          <p className="footer__develop-text">
            Концепия и дизайн &mdash;&nbsp;
            <a
              className="footer__develop-accent"
              href="https://krkr.design/"
              target="_blank"
              rel="noopener noreferrer"
            >
              krkr.design
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
