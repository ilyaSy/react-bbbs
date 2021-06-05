import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useBooksGenres(perPage) {
  const [booksData, setBooksData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    Api.getBooks()
      .then((data) => {
        const scienceBooks = data.filter((book) => book.genre === 'Научные');
        const fictionBooks = data.filter((book) => book.genre === 'Художественные');
        // по фильтру "Все" книги выходят в порядке научная - художественная - науч - худ и т.д.
        const orderedBookList = scienceBooks
          .map((sb, i) => [sb, fictionBooks[i]])
          .flat()
          .filter((book) => book);
        setBooksData(orderedBookList);
        const genresData = data
          .map((item) => item.genre)
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setGenres(['Все', ...genresData]);
        setPageCount(Math.ceil(data.length / perPage));
      })
      .catch(console.log);
  }, []);

  return { booksData, genres, pageCount };
}
