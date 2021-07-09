import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useArticles() {
  const [articlesData, setArticlesData] = useState([]);
  const [chosenArticle, setChosenArticle] = useState({});
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    Api.getArticles()
      .then((data) => {
        setArticlesData(data.results);
        const chosen = data.filter((article) => article.chosen)[0];
        setChosenArticle(chosen);
        setPageCount(data.totalPages);
      })
      .catch(console.log);
  }, []);

  return { articlesData, chosenArticle, pageCount };
}
