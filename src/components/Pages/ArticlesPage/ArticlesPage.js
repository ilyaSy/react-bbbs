// import { useState } from 'react';
import { Helmet } from 'react-helmet';
import defineColor from '../../../utils/renderColors';
import Card from '../../Cards/Card/Card';
import Pagination from '../../UI/Pagination/Pagination';
import useArticles from '../../../hooks/useArticles';

const ArticlesPage = () => {
  // const [currentPage, setCurrentPage] = useState(0);
  // const perPage = 16;
  // const offset = currentPage * perPage;
  const { articlesData, chosenArticle, pageCount } = useArticles();

  const currentPageData = articlesData
    // .slice(offset, offset + perPage)
    .map(({ id: key, ...args }, i) => (
      <Card key={key} type="article" size="small" color={defineColor(i)} data={args} />
    ));

  return (
    <section className="bookpage content main__section">
      <Helmet>
        <title>Статьи</title>
        <meta name="description" content="article" />
      </Helmet>
      <section className="event-choice">
        <h1 className="heading heading_place_articles">Статьи</h1>
      </section>
      <section className="event-soon-card">
        <Card type="article" size="big" color="yellow" data={chosenArticle} />
      </section>
      <section className="events-grid events-grid_place_article">{currentPageData}</section>
      <Pagination pageCount={pageCount} />
    </section>
  );
};

export default ArticlesPage;
