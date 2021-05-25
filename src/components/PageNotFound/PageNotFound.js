import { Link } from 'react-router-dom';
import notFound from '../../assets/img/page-not-found.svg';
import './pageNotFound.css';

const PageNotFound = () => (
  <div className="page-not-found">
    <img className="page-not-found__img" src={notFound} alt="Страница не найдена" />
    <h1 className="page-not-found__title">404</h1>
    <p className="page-not-found__subtitle">К сожалению, запрашиваемая страница не найдена.</p>
    <p className="page-not-found__subtitle">Попробуйте перейти на главную страницу</p>
    <Link to="/" className="button button_color_blue">
      Вернутся на главную
    </Link>
  </div>
);
export default PageNotFound;
