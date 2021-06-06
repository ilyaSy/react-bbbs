import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import VideoCard from '../../Cards/VideoCard/VideoCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import Pagination from '../../UI/Pagination/Pagination';
import useMoviesGenres from '../../../hooks/useMoviesGenres';
import {
  setActiveFilters,
  filterItemByFiltersList,
  getMultipleTagsIndex,
} from '../../../utils/filters';
import './MoviesPage.css';

const MoviesPage = ({ handleVideoClick }) => {
  const [activeGenres, setActiveGenres] = useState(['Все']);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  const { moviesData, genres, pageCount } = useMoviesGenres(perPage);

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

  const handleGenreFilter = (genre) => {
    setActiveGenres(setActiveFilters(activeGenres, genre));
  };

  return (
    <section className="filmpage content main__section">
      <Helmet>
        <title>Фильмы</title>
        <meta name="description" content="movies" />
      </Helmet>
      <Heading>Фильмы</Heading>
      <div className="scroll-container">
        <ScrollContainer list={genres} activeItems={activeGenres} onClick={handleGenreFilter} />
      </div>
      <ul className="filmpage__list">{currentPageData}</ul>
      <Pagination pageCount={pageCount} setCurrentPage={setCurrentPage} />
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
