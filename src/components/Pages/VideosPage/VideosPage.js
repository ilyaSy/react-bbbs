import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import MainVideoCard from '../../Cards/MainVideoCard/MainVideoCard';
import VideoCard from '../../Cards/VideoCard/VideoCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import Pagination from '../../UI/Pagination/Pagination';
import tagsFilter from '../../../utils/filtering';
import Api from '../../../utils/api';
import './VideosPage.css';

const VideosPage = ({ handleVideoClick }) => {
  const tagAll = { name: 'Все', id: 0, slug: '' };
  const [activeTags, setActiveTags] = useState([tagAll]);
  const [params, setParams] = useState([]);
  const [videos, setVideos] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [chosenVideo, setChosenVideo] = useState(null);

  useEffect(() => {
    Api.getVideosTags()
      .then((tagsResp) => {
        tagsResp.unshift(tagAll);
        setTags(tagsResp);
        setActiveTags([tagAll]);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    Api.getVideos(params.join())
      .then((videosResp) => {
        const videosData = videosResp.results;
        setChosenVideo(videosData.shift());
        setVideos(videosData);
        setPageCount(videosResp.totalPages);
      })
      .catch(console.log);
  }, [params]);

  const currentPageData = videos.map(({ id: key, ...args }) => (
    <VideoCard type="video" key={key} handleVideoClick={handleVideoClick} {...args} />
  ));

  const handleTagFilter = (tag) => {
    tagsFilter(tag, activeTags, setParams, setActiveTags);
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
          list={tags}
          activeItems={activeTags}
          onClick={handleTagFilter}
          sectionClass="grid-calendar__buttons"
        />
      </div>
      {activeTags[0].slug === tagAll.slug && (
        <section className="mainvideo videopage__bigvideo">
          <MainVideoCard video={chosenVideo} handleVideoClick={handleVideoClick} />
        </section>
      )}
      <ul className="videopage__list">{currentPageData}</ul>
      <Pagination pageCount={pageCount} />
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
