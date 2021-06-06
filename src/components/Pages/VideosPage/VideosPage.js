import { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import MainVideoCard from '../../Cards/MainVideoCard/MainVideoCard';
import VideoCard from '../../Cards/VideoCard/VideoCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import Pagination from '../../UI/Pagination/Pagination';
import { setActiveFilters, filterItemByFiltersList } from '../../../utils/filters';
import useVideos from '../../../hooks/useVideos';
import './VideosPage.css';

const VideosPage = ({ handleVideoClick }) => {
  const [activeTags, setActiveTags] = useState(['Все']);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  const { videosData, chosenVideo, videoTags, pageCount } = useVideos(perPage);

  const currentPageData = videosData
    .slice(offset, offset + perPage)
    .filter((video) => filterItemByFiltersList(activeTags, video.tag.name))
    .sort((a, b) => activeTags.indexOf(a.tag.name) > activeTags.indexOf(b.tag.name))
    .map(({ tag, id: key, ...args }) => (
      <VideoCard type="video" key={key} handleVideoClick={handleVideoClick} tag={[tag]} {...args} />
    ));

  const handleTagFilter = (tag) => {
    setActiveTags(setActiveFilters(activeTags, tag));
  };

  return (
    <section className="videopage content main__section">
      <Helmet>
        <title>Видео</title>
        <meta name="description" content="video" />
      </Helmet>
      <Heading>Видео</Heading>
      <div className="scroll-container">
        <ScrollContainer
          list={videoTags}
          activeItems={activeTags}
          onClick={handleTagFilter}
          sectionClass="grid-calendar__buttons"
        />
      </div>
      {activeTags[0] === 'Все' && (
        <section className="mainvideo videopage__bigvideo">
          <MainVideoCard video={chosenVideo} handleVideoClick={handleVideoClick} />
        </section>
      )}
      <ul className="videopage__list">{currentPageData}</ul>
      <Pagination pageCount={pageCount} setCurrentPage={setCurrentPage} />
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
