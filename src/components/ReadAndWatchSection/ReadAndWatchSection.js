import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import defineColor from '../../utils/renderColors';
import defineFigure from '../../utils/renderFigures';
import Book from '../Book/Book';
import Movie from '../Movie/Movie';
import ArticleRaW from '../ArticleRaW/ArticleRaW';
import ArticleGuide from '../ArticleGuide/ArticleGuide';

const ReadAndWatchSection = ({ sectionTitle, path, data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 4;
  const offset = currentPage * perPage;
  const pageCount = Math.ceil(data.length / perPage);

  let currentPageData;
  switch (sectionTitle) {
    case 'Справочник':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ id: key, ...args }, i) => (
          <ArticleGuide figure={defineFigure(i)} size="small" key={key} {...args} />
        ));
      break;
    case 'Видео':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ id: key, ...args }) => <Movie type="video" key={key} {...args} />);
      break;
    case 'Статьи':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ id: key, ...args }, i) => (
          <ArticleRaW color={defineColor(i)} key={key} {...args} />
        ));
      break;
    case 'Фильмы':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ id: key, ...args }) => <Movie type="movie" key={key} {...args} />);
      break;
    case 'Книги':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ id: key, ...args }) => <Book key={key} {...args} />);
      break;
    default:
      currentPageData = [];
  }

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section className="raw__section">
      <div className="readwatch">
        <Link className="readwatch__heading" to={path}>
          {sectionTitle}
        </Link>
        <ReactPaginate
          pageCount={pageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={perPage}
          containerClassName="readwatch__pagination"
          previousClassName="readwatch__back"
          nextClassName="readwatch__forward"
          onPageChange={handlePageClick}
        />
      </div>
      {sectionTitle === 'Справочник' && <ul className="guide">{currentPageData}</ul>}
      {sectionTitle === 'Видео' && <ul className="movies">{currentPageData}</ul>}
      {sectionTitle === 'Статьи' && (
        <section className="events-grid events-grid_place_raw">{currentPageData}</section>
      )}
      {sectionTitle === 'Фильмы' && <ul className="movies">{currentPageData}</ul>}
      {sectionTitle === 'Книги' && <ul className="books">{currentPageData}</ul>}
    </section>
  );
};

ReadAndWatchSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  path: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

ReadAndWatchSection.defaultProps = {
  path: '',
};

export default ReadAndWatchSection;
