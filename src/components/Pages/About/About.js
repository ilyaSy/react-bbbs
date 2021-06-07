import './About.css';
import { Helmet } from 'react-helmet';
import logoSbbsBlue from '../../../assets/img/logoSBSS-blue.svg';
import AboutCard from '../../Cards/AboutCard/AboutCard';

const About = () => (
  <section className="content main__section">
    <Helmet>
      <title>О проекте</title>
      <meta name="description" content="About" />
    </Helmet>
    <div className="title">
      Наставники.про&nbsp;&mdash; цифровая информационная платформа организации &laquo;Старшие
      Братья Старшие Сестры&raquo;. Созданная для поддержки наставников программы.
    </div>
    <a
      className="logo logo_place_about"
      href="https://www.nastavniki.org/o-nas/ob-organizaczii/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className="logo__img" src={logoSbbsBlue} alt="Логотип Старшие Братья Старшие Сестры" />
    </a>

    <section className="about-project">
      <div className="circle">
        <div className="circle__caption">
          <div className="circle__title">Об организации</div>
        </div>
      </div>
      <article className="project-article">
        <p className="project-article__paragraph">
          &laquo;Старшие Братья Старшие Сестры&raquo;&nbsp;&mdash; межрегиональная общественная
          организация содействия воспитанию подрастающего поколения. Мы&nbsp;поддерживаем детей,
          которым требуется внимание: оставшихся без попечения родителей, приемных, детей
          из&nbsp;неполных, многодетных или неблагополучных семей, детей с&nbsp;ограниченными
          возможностями.
        </p>
        <p className="project-article__paragraph">
          Любому человеку, тем более ребенку, необходимо общение. Без него дети растут неуверенными
          и&nbsp;замкнутыми. Одиночество токсично, а&nbsp;самое надежное противоядие &mdash; дружба.
        </p>
        <p className="project-article__paragraph">
          Мы&nbsp;помогаем детям, которым не&nbsp;хватает поддержки взрослого друга,
          &laquo;Младшим&raquo;. Таким другом становится наш волонтер, &laquo;Старший&raquo;.
          Он&nbsp;принимает ребенка, какой он&nbsp;есть, поддерживает, помогает раскрыть потенциал,
          почувствовать уверенность в&nbsp;своих силах, узнать элементарные вещи о&nbsp;жизни,
          адаптироваться и&nbsp;полноценно участвовать в&nbsp;жизни общества.
        </p>
      </article>
    </section>

    <section className="about-project-quote">
      <div className="quote">
        <blockquote className="quote__text">
          Мы хотим, чтобы наставник был у каждого ребенка, который в&nbsp;нем нуждается
        </blockquote>
      </div>
    </section>
    <ul className="project-cards">
      <AboutCard
        link="https://www.nastavniki.org/campaign/pomoch-dengami/"
        color="blue"
        text="Деньги пойдут на&nbsp;оплату работы кураторов программы (профессиональные
          психологи/социальные работники), которые поддерживают дружбу между ребенком
          и&nbsp;наставником."
        button="Пожертвования"
        linkText="сделать пожертвование"
      />
      <AboutCard
        link="https://www.nastavniki.org/volontyorstvo/kak-stat-volonterom/"
        color="pink"
        text="Наставник &laquo;Старшие Братья Старшие Сестры&raquo;&nbsp;&mdash; значимый взрослый,
        который становится для ребенка старшим другом, ролевой моделью, принимает своего
        &laquo;Младшего&raquo; таким, какой он&nbsp;есть. &laquo;Старший&raquo; открывает для
        ребенка дверь в&nbsp;большой мир и&nbsp;дарит ему надежду на&nbsp;более счастливое
        и&nbsp;успешное будущее."
        button="Наставничество"
        linkText="подробнее"
      />
      <AboutCard
        link="https://www.nastavniki.org/oficzialno/korporativnyim-partnyoram/"
        color="green"
        text="Компании поддерживают нас не&nbsp;только деньгами, но&nbsp;и&nbsp;делами. Мы&nbsp;собрали
        все возможные способы поддержки и&nbsp;сотрудничества: профессиональная помощь Pro Bono,
        организационная помощь, корпоративное волонтерство, мастер-классы, лекции, учебные программы."
        button="Партнерство"
        linkText="подробнее"
      />
    </ul>
  </section>
);

export default About;
