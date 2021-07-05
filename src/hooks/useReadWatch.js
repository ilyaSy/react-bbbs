import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Api from '../utils/api';

export default function useReadWatch() {
  const [guideData, setGuideData] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    Promise.all([
      Api.getMaterials(),
      Api.getVideos(),
      Api.getArticles(),
      Api.getMovies(),
      Api.getBooks(),
    ])
      .then(([materials, videos, articles, movies, books]) => {
        setGuideData(materials.results);
        // Неавторизованный пользователь не видит видео с тегом "Ресурсная группа"
        setVideosData(
          videos.filter(
            ({ tag }) => currentUser || !currentUser === (tag.name !== 'Ресурсная группа')
          )
        );
        setArticlesData(articles);
        setMoviesData(movies);
        setBooksData(books);
      })
      .catch(console.log);
  }, []);

  return { guideData, videosData, articlesData, moviesData, booksData };
}
