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
      .catch(console.log);
  }, []);

  return (
    <section className="raw content main__section">
      <ReadAndWatchSection sectionTitle="Справочник" path="/read-watch/guide" data={guideData} />
      <ReadAndWatchSection sectionTitle="Видео" path="/read-watch/videos" data={videosData} />
      <ReadAndWatchSection sectionTitle="Статьи" path="/read-watch/articles" data={articlesData} />
      <ReadAndWatchSection sectionTitle="Фильмы" path="/read-watch/movies" data={moviesData} />
      <ReadAndWatchSection sectionTitle="Книги" path="/read-watch/books" data={booksData} />
    </section>
  );
};

export default ReadAndWatch;
