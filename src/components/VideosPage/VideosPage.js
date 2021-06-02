import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Api from '../../utils/api';
import Button from '../Button/Button';
import MainVideo from '../MainVideo/MainVideo';
import Movie from '../Movie/Movie';
import './VideosPage.css';

const VideosPage = ({ handlerVideoClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const [videosData, setVideosData] = useState([]);
  const [chosenVideo, setChosenVideo] = useState({});
  const [videoTags, setVideoTags] = useState([]);
  const [activeTag, setActiveTag] = useState('Все');
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  let pageCount;

  useEffect(() => {
    Api.getVideos()
      .then((data) => {
        setVideosData(data);
        // Видео, выбранное модератором
        const chosen = data.filter((video) => video.chosen)[0];
        setChosenVideo({ ...chosen });
        // Список уникальных тегов для кнопок фильтра-рубрикатора
        const tagsData = data
          .map((video) => video.tag.name)
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setVideoTags(['Все', ...tagsData]);
        // Подсчёт кол-ва страниц: округление частного общего кол-ва на кол-во на одной странице
        pageCount = Math.ceil(data.length / perPage);
      })
      .catch(console.log);
  }, []);

  const currentPageData = videosData
    .slice(offset, offset + perPage)
    .filter((video) => activeTag === 'Все' || activeTag === video.tag.name)
    // Неавторизованный пользователь не видит видео с тегом "Ресурсная группа"
    .filter(({ tag }) => currentUser || !currentUser === (tag.name !== 'Ресурсная группа'))
    .map(({ tag, id: key, ...args }) => <Movie type="video" key={key} handlerVideoClick={handlerVideoClick} tag={[tag]} {...args} />);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleTagFilter = (tag) => {
    if (activeTag && activeTag === tag) {
      setActiveTag('Все');
    } else {
      setActiveTag(tag);
    }
  };

  return (
    <section className="videopage content main__section">
      <h1 className="heading">Видео</h1>
      <div className="buttons-scroll buttons-scroll_centered">
        {videoTags.map((tag) =>
          // Неавторизованный пользователь не видит видео с тегом "Ресурсная группа"
          !currentUser && tag === 'Ресурсная группа' ? null : (
            <Button
              className={`button button_color_black button_place_scroll ${
                tag === activeTag ? 'button_color_black_active' : ''
              }`}
              type="button"
              key={tag}
              onClick={() => handleTagFilter(tag)}
            >
              {tag}
            </Button>
          )
        )}
      </div>
      {activeTag === 'Все' && (
        <section className="mainvideo videopage__bigvideo">
          <MainVideo video={chosenVideo} />
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
  handlerVideoClick: PropTypes.func.isRequired,
};
export default VideosPage;
