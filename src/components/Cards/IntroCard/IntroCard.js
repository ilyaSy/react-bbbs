import './IntroCard.css';
import logoSbbsBlue from '../../../assets/img/logoSBSS-blue.svg';

const IntroCard = () => (
  <div className="bbbs">
    <div className="bbbs__logo">
      <a
        className="logo logo_place_mainpage"
        href="https://www.nastavniki.org/o-nas/ob-organizaczii/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="logo__img" src={logoSbbsBlue} alt="Логотип Старшие Братья Старшие Сестры" />
      </a>
    </div>
    <div className="bbbs__about">
      <p className="bbbs__text">
        Наставники.про&nbsp;&mdash;цифровая информационная платформа огрганизации &laquo;Старшие
        Братья Старшие Сестры&raquo;.Созданная для поддержки наставников программы.
      </p>
    </div>
  </div>
);

export default IntroCard;
