import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import MainVideoCard from '../../Cards/MainVideoCard/MainVideoCard';
import VideoCard from '../../Cards/VideoCard/VideoCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import { setActiveFilters, filterItemByFiltersList } from '../../../utils/filters';
import useVideos from '../../../hooks/useVideos';
import './VideosPage.css';

const VideosPage = ({ handleVideoClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const [activeTags, setActiveTags] = useState(['Все']);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  const { videosData, chosenVideo, videoTags, pageCount } = useVideos(perPage);

  const currentPageData = videosData
    .slice(offset, offset + perPage)
    .filter((video) => filterItemByFiltersList(activeTags, video.tag.name))
    .sort((a, b) => activeTags.indexOf(a.tag.name) > activeTags.indexOf(b.tag.name))
    // Неавторизованный пользователь не видит видео с тегом "Ресурсная группа"
    .filter(({ tag }) => currentUser || !currentUser === (tag.name !== 'Ресурсная группа'))
    .map(({ tag, id: key, ...args }) => (
      <VideoCard type="video" key={key} handleVideoClick={handleVideoClick} tag={[tag]} {...args} />
    ));

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleTagFilter = (tag) => {
    setActiveTags(setActiveFilters(activeTags, tag));
  };

  return (
    <section className="videopage content main__section">
      <Heading>Видео</Heading>
      <div className="scroll-container">
        <ScrollContainer
          list={videoTags.filter(
            (tag) => currentUser || !currentUser === (tag !== 'Ресурсная группа')
          )}
          activeItems={activeTags}
          onClick={handleTagFilter}
          sectionClass="grid-calendar__buttons"
        />
      </div>
      {activeTags[0] === 'Все' && (
        <section className="mainvideo videopage__bigvideo">
          <MainVideoCard video={chosenVideo} />
        </section>
      )}
      <ul className="videopage__list">{currentPageData}</ul>
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

VideosPage.propTypes = {
  handleVideoClick: PropTypes.func,
};

VideosPage.defaultProps = {
  handleVideoClick: () => {},
};

export default VideosPage;
