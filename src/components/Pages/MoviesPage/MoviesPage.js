import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Api from '../../../utils/api';
import VideoCard from '../../Cards/VideoCard/VideoCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import {
  setActiveFilters,
  filterItemByFiltersList,
  getMultipleTagsIndex,
} from '../../../utils/filters';
import './MoviesPage.css';

const MoviesPage = ({ handleVideoClick }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeGenres, setActiveGenres] = useState(['Все']);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  let pageCount;

  useEffect(() => {
    Api.getMovies()
      .then((data) => {
        const movies = data.map((movie) => ({
          tagNames: movie.tags.map((tag) => tag.name),
          ...movie,
        }));
        setMoviesData(movies);
        // Список уникальных жанров для кнопок фильтра-рубрикатора

        const genresData = movies
          .map((movie) => movie.tagNames)
          .flat()
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setGenres(['Все', ...genresData]);
        // Подсчёт кол-ва страниц: округление частного общего кол-ва на кол-во на одной странице
        pageCount = Math.ceil(movies.length / perPage);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  const currentPageData = moviesData
    .slice(offset, offset + perPage)
    // .filter((movie) => {
    .filter((movie) => filterItemByFiltersList(activeGenres, movie.tagNames))
    .sort(
      (a, b) =>
        getMultipleTagsIndex(activeGenres, a.tagNames) >
        getMultipleTagsIndex(activeGenres, b.tagNames)
    )
    .map(({ id: key, ...args }) => (
      <VideoCard key={key} type="movie" {...args} handleVideoClick={handleVideoClick} />
    ));

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleGenreFilter = (genre) => {
    setActiveGenres(setActiveFilters(activeGenres, genre));
  };

  return (
    <section className="filmpage content main__section">
      <Heading>Фильмы</Heading>
      <div className="scroll-container">
        <ScrollContainer list={genres} activeItems={activeGenres} onClick={handleGenreFilter} />
      </div>
      <ul className="filmpage__list">{currentPageData}</ul>
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={pageCount}
        marginPagesDisplayed={1}
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

MoviesPage.propTypes = {
  handleVideoClick: PropTypes.func,
};
MoviesPage.defaultProps = {
  handleVideoClick: () => {},
};
export default MoviesPage;
