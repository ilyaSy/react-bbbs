import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import animeJson from '../../../animations/Illustration_404.json';
import './pageNotFound.css';

const PageNotFound = () => {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animeJson,
    });
  }, []);
  return (
    <div className="page-not-found">
      <Helmet>
        <title>404</title>
        <meta name="description" content="404" />
      </Helmet>
      <div className="page-not-found__img" ref={container} />
      <h1 className="page-not-found__title">404</h1>
      <p className="page-not-found__subtitle">К сожалению, запрашиваемая страница не найдена.</p>
      <p className="page-not-found__subtitle">Попробуйте перейти на главную страницу</p>
      <Link to="/" className="button button_nodecoration button_color_blue">
        Вернуться на главную
      </Link>
    </div>
  );
};
export default PageNotFound;
