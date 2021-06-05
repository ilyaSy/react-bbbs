import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import defineColor from '../../../utils/renderColors';
import Card from '../../Cards/Card/Card';
import useArticles from '../../../hooks/useArticles';

const ArticlesPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  const { articlesData, chosenArticle, pageCount } = useArticles(perPage);

  const currentPageData = articlesData
    .slice(offset, offset + perPage)
    .map((article, i) => (
      <Card type="article" size="small" color={defineColor(i)} data={article} />
    ));

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section className="bookpage content main__section">
      <section className="event-choice">
        <h1 className="heading heading_place_articles">Статьи</h1>
      </section>
      <section className="event-soon-card">
        <Card type="article" size="big" color="yellow" data={chosenArticle} />
      </section>
      <section className="events-grid events-grid_place_article">{currentPageData}</section>
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        containerClassName="pagination"
        breakClassName="pagination__link"
        breakLabel="..."
        activeClassName="pagination__link_active"
        nextClassName="pagination__forward"
        pageLinkClassName="pagination__link"
        onPageChange={handlePageClick}
      />
    </section>
  );
};

export default ArticlesPage;
