import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import VideoCard from '../../Cards/VideoCard/VideoCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import Pagination from '../../UI/Pagination/Pagination';
import tagsFilter from '../../../utils/filtering';
import Api from '../../../utils/api';
import './MoviesPage.css';

const MoviesPage = ({ handleVideoClick }) => {
  const tagAll = { name: 'Все', id: 0, slug: '' };
  const [params, setParams] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    Api.getMoviesTags()
      .then((tagsData) => {
        tagsData.unshift(tagAll);
        setTags(tagsData);
        setActiveTags([tagAll]);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    Api.getMovies(params.join())
      .then((moviesData) => {
        setMovies(moviesData.results);
        setPageCount(moviesData.totalPages);
      })
      .catch(console.log);
  }, [params]);

  const currentPageData = movies.map(({ id: key, ...args }) => (
    <VideoCard key={key} type="movie" {...args} handleVideoClick={handleVideoClick} />
  ));

  const handleTagFilter = (tag) => {
    tagsFilter(tag, activeTags, setParams, setActiveTags);
  };

  return (
    <section className="filmpage content main__section">
      <Helmet>
        <title>Фильмы</title>
        <meta name="description" content="movies" />
      </Helmet>
      <Heading>Фильмы</Heading>
      <div className="scroll-container">
        <ScrollContainer list={tags} activeItems={activeTags} onClick={handleTagFilter} />
      </div>
      <ul className="filmpage__list">{currentPageData}</ul>
      <Pagination pageCount={pageCount} />
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
