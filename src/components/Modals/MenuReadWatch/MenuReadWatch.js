import { Link } from 'react-router-dom';
import './MenuReadWatch.css';

const MenuReadWatch = () => (
  <ul className="header__menu-raw">
    <li className="header__burger-item">
      <Link to="/read-watch/guide" className="header__burger-link">
        Справочник
      </Link>
    </li>
    <li className="header__burger-item">
      <Link to="/read-watch/videos" className="header__burger-link">
        Видео
      </Link>
    </li>
    <li className="header__burger-item">
      <Link to="/read-watch/articles" className="header__burger-link">
        Статьи
      </Link>
    </li>
    <li className="header__burger-item">
      <Link to="/read-watch/movies" className="header__burger-link">
        Фильмы
      </Link>
    </li>
    <li className="header__burger-item">
      <Link to="/read-watch/books" className="header__burger-link">
        Книги
      </Link>
    </li>
  </ul>
);

export default MenuReadWatch;
