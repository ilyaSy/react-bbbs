import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useArticles(perPage) {
  const [articlesData, setArticlesData] = useState([]);
  const [chosenArticle, setChosenArticle] = useState({});
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    Api.getArticles()
      .then((data) => {
        const chosen = data.filter((article) => article.chosen)[0];
        setChosenArticle({ ...chosen });
        setArticlesData(data);
        setPageCount(Math.ceil(data.length / perPage));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  return { articlesData, chosenArticle, pageCount };
}
