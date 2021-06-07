import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import defineColor from '../../../utils/renderColors';
import defineFigure from '../../../utils/renderFigures';
import BookCard from '../../Cards/BookCard/BookCard';
import VideoCard from '../../Cards/VideoCard/VideoCard';
import Card from '../../Cards/Card/Card';
import GuideCard from '../../Cards/GuideCard/GuideCard';
import './ReadAndWatchSection.css';

const ReadAndWatchSection = ({ sectionTitle, path, data, handleVideoClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 4;
  const offset = currentPage * perPage;
  const pageCount = Math.ceil(data.length / perPage);

  let currentPageData;
  switch (sectionTitle) {
    case 'Справочник':
      currentPageData = data
        .map((article, i) => ({ figure: defineFigure(i), ...article }))
        .slice(offset, offset + perPage)
        .map(({ id: key, ...args }) => <GuideCard size="small" key={key} {...args} />);
      break;
    case 'Видео':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ id: key, ...args }) => (
          <VideoCard type="video" key={key} {...args} handleVideoClick={handleVideoClick} />
        ));
      break;
    case 'Статьи':
      currentPageData = data
        .map((article, i) => ({ color: defineColor(i), ...article }))
        .slice(offset, offset + perPage)
        .map(({ id: key, color, ...args }) => (
          <Card type="article" key={key} color={color} size="small" data={args} />
        ));
      break;
    case 'Фильмы':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ id: key, ...args }) => (
          <VideoCard type="movie" key={key} {...args} handleVideoClick={handleVideoClick} />
        ));
      break;
    case 'Книги':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ id: key, ...args }) => <BookCard key={key} {...args} />);
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
          previousLinkClassName="readwatch__back-link"
          nextLinkClassName="readwatch__forward-link"
          nextLabel=""
          previousLabel=""
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
  handleVideoClick: PropTypes.func,
};

ReadAndWatchSection.defaultProps = {
  path: '',
  handleVideoClick: () => {},
};

export default ReadAndWatchSection;
