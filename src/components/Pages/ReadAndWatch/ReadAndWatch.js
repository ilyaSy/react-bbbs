import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReadAndWatchSection from '../../Containers/ReadAndWatchSection/ReadAndWatchSection';
import useReadWatch from '../../../hooks/useReadWatch';
import './ReadAndWatch.css';

const ReadAndWatch = ({ handleVideoClick }) => {
  const { guideData, videosData, articlesData, moviesData, booksData } = useReadWatch();

  return (
    <section className="raw content main__section">
      <Helmet>
        <title>Читать и смотреть</title>
        <meta name="description" content="read and watch" />
      </Helmet>
      <ReadAndWatchSection sectionTitle="Справочник" path="/read-watch/guide" data={guideData} />
      <ReadAndWatchSection
        sectionTitle="Видео"
        path="/read-watch/videos"
        data={videosData}
        handleVideoClick={handleVideoClick}
      />
      <ReadAndWatchSection sectionTitle="Статьи" path="/read-watch/articles" data={articlesData} />
      <ReadAndWatchSection
        sectionTitle="Фильмы"
        path="/read-watch/movies"
        data={moviesData}
        handleVideoClick={handleVideoClick}
      />
      <ReadAndWatchSection sectionTitle="Книги" path="/read-watch/books" data={booksData} />
    </section>
  );
};

ReadAndWatch.propTypes = {
  handleVideoClick: PropTypes.func,
};
ReadAndWatch.defaultProps = {
  handleVideoClick: () => {},
};
export default ReadAndWatch;
