import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useReadWatch() {
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

  return { guideData, videosData, articlesData, moviesData, booksData };
}
