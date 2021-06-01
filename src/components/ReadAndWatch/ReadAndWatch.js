import { useEffect, useState } from 'react';
import Api from '../../utils/api';
import ReadAndWatchSection from '../ReadAndWatchSection/ReadAndWatchSection';
import './ReadAndWatch.css';

const ReadAndWatch = () => {
  const [guideData, setGuideData] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    Promise.all([
      Api.getMaterials(),
      Api.getVideos(),
      Api.getArticles(),
      Api.getMovies(),
      Api.getBooks(),
    ])
      .then(([materials, videos, articles, movies, books]) => {
        setGuideData(materials);
        setVideosData(videos);
        setArticlesData(articles);
        setMoviesData(movies);
        setBooksData(books);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <section className="raw content main__section">
      <ReadAndWatchSection sectionTitle="Справочник" path="/guide" data={guideData} />
      <ReadAndWatchSection sectionTitle="Видео" path="/videos" data={videosData} />
      <ReadAndWatchSection sectionTitle="Статьи" path="/articles" data={articlesData} />
      <ReadAndWatchSection sectionTitle="Фильмы" path="/movies" data={moviesData} />
      <ReadAndWatchSection sectionTitle="Книги" path="/books" data={booksData} />
    </section>
  );
};

export default ReadAndWatch;
